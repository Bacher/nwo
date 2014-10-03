/**
 * @typedef {Object} Vector
 * @property x
 * @property y
 */

/**
 * @typedef {Object} NormalizedVector
 * @property x
 * @property y
 */

(function() {

    nwo.GameObject = inherit('game-object', {
        _ctor: function(params) {
            params = _.extend({
                pos: {
                    x: 0,
                    y: 0
                },
                collisions: {}
            }, params);

            _.extend(this, {
                _pos: {
                    x: params.pos.x,
                    y: params.pos.y
                },
                _dir: params.dir || {
                    x: 0,
                    y: 0
                },
                _rot: 0,
                _speed: 0,
                _selfSpeed: params.selfSpeed || 0,
                _size: params.size || 0,
                _terrainCollision: params.collisions.terrain || false,
                _rotateTextureByDirection: params.rotateTextureByDirection,
                _zIndex: params.zIndex || 'normal',
                _logicStages: ['_updatePosition'],
                _drawStages: []
            });

            if (params.lifeTime) {
                this._logicStages.unshift('_checkLifeEnd');
                this._lifeEndTs = nwo.time + params.lifeTime;
            }

            this.setRotation(this._dir);

            this.setDirection(this._dir);

            nwo.trigger('object-created', this);
        },

        destroy: function() {
            nwo.trigger('object-destroyed', this);
        },

        updateLogic: function() {
            var that = this;

            this._logicStages.forEach(function(logicStage) {
                that[logicStage]();
            });
        },

        _updatePosition: function() {
            if (this._selfSpeed && (this._dir.x || this._dir.y)) {
                var delta = this._selfSpeed / 140;

                var newPos = {
                    x: this._pos.x + this._dir.x * delta,
                    y: this._pos.y + this._dir.y * delta
                };

                var success = false;

                if (this._terrainCollision) {
                    if (this._checkTerrainCollision(newPos)) {
                        success = true;

                    } else if (this._dir.x && this._dir.y) {
                        var newPosY = {
                            x: this._pos.x,
                            y: this._pos.y + (this._dir.y > 0 ? delta : -delta)
                        };

                        if (this._checkTerrainCollision(newPosY)) {
                            newPos = newPosY;
                            success = true;

                        } else {
                            var newPosX = {
                                x: this._pos.x + (this._dir.x > 0 ? delta : -delta),
                                y: this._pos.y
                            };

                            if (this._checkTerrainCollision(newPosX)) {
                                newPos = newPosX;
                                success = true;
                            }
                        }
                    }

                } else {
                    success = true;
                }

                if (success) {
                    this._speed = this._selfSpeed;
                    this._pos.x = newPos.x;
                    this._pos.y = newPos.y;
                } else {
                    this._speed = 0;
                }
            } else {
                this._speed = 0;
            }
        },

        _checkTerrainCollision: function(pos) {
            var halfSize = this._size / 2;

            return nwo.map.checkCollision([
                {
                    x: pos.x - halfSize,
                    y: pos.y - halfSize
                },
                {
                    x: pos.x + halfSize,
                    y: pos.y + halfSize
                }
            ]);
        },

        _checkLifeEnd: function() {
            if (nwo.time >= this._lifeEndTs) {
                this.destroy();
            }
        },

        draw: function() {
            var that = this;

            this._drawStages.forEach(function(drawStage) {
                that[drawStage]();
            });
        },

        /**
         * @param {Position} newPos
         */
        move: function(newPos) {
            this._pos.x = newPos.x;
            this._pos.y = newPos.y;
        },

        checkCollision: function(otherObject) {
            return (
                this._checkAxisCollision('x', this, otherObject) ||
                this._checkAxisCollision('y', this, otherObject)
                );
        },

        _checkAxisCollision: function(axis, obj1, obj2) {
            var s1 = {
                start: obj1._pos[axis] - obj1._size / 2,
                size: obj1._size
            };

            var s2 = {
                start: obj2._pos[axis] - obj2._size / 2,
                size: obj2._size
            };

            if (s1.start > s2.start) {
                var st = s1;
                s1 = s2;
                s2 = st;
            }

            return s1.start + s1.size < s2.start;
        },

        /**
         *
         * @param {NormalizedVector|number} vector
         */
        setDirection: function(vector) {
            if (vector && vector.x != null && vector.y != null) {
                this._dir.x = vector.x;
                this._dir.y = vector.y;

            } else if (vector != null) {
                var dir = {
                    x: Math.tan(vector),
                    y: 1 / Math.tan(vector)
                };

                this._dir = nwo.normalize(dir);
            }

            this.setRotation(vector);

            if (this._rotateTextureByDirection) {
                this.setTexRotation(vector);
            }
        },

        setRotation: function(value) {
            this._rot = nwo.getAngle(value);
        },

        setTexRotation: function(vector) {
            this._texRotation = nwo.getAngle(vector);
        }
    });

})();
