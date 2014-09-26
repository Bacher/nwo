
(function() {

    function GameObject(params) {
        params = params || {};
        var collisions = params.collisions || {};

        _.extend(this, {
            _pos: params.pos || {
                x: 0,
                y: 0
            },
            _dir: params.dir || {
                x: 0,
                y: 0
            },
            _rot: 0,
            _speed: params.speed || 0,
            _size: params.size || 0,
            _terrainCollision: collisions.terrain || false,
            _logicStages: ['_updatePosition'],
            _drawStages: []
        });

        if (params.lifetime) {
            this._logicStages.unshift('_checkLifeEnd');
            this._lifeEndTs = nwo.time + params.lifetime;
        }

        if (this._dir.x || this._dir.y) {
            this.setRotation(this._dir);
        }

        nwo.trigger('object-created', this);
    }

    GameObject.prototype.destroy = function() {
        nwo.trigger('object-destroyed', this);
    };

    GameObject.prototype.updateLogic = function() {
        var that = this;

        this._logicStages.forEach(function(logicStage) {
            that[logicStage]();
        });
    };

    GameObject.prototype._updatePosition = function() {
        if (this._speed && (this._dir.x || this._dir.y)) {
            var delta = this._speed / 140;

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
                this._pos.x = newPos.x;
                this._pos.y = newPos.y;
            }
        }
    };

    GameObject.prototype._checkTerrainCollision = function(pos) {
        var halfSize = this._size / 2;

        return nwo.map.checkCollision([{
            x: pos.x - halfSize,
            y: pos.y - halfSize
        }, {
            x: pos.x + halfSize,
            y: pos.y + halfSize
        }]);
    };

    GameObject.prototype._checkLifeEnd = function() {
        if (nwo.time >= this._lifeEndTs) {
            this.destroy();
        }
    };

    GameObject.prototype.draw = function() {
        var that = this;

        this._drawStages.forEach(function(drawStage) {
            that[drawStage]();
        });
    };

    /**
     * @param {Position} newPos
     */
    GameObject.prototype.move = function(newPos) {
        this._pos.x = newPos.x;
        this._pos.y = newPos.y;
    };

    GameObject.prototype.checkCollision = function(otherObject) {
        return (
            this._checkAxisCollision('x', this, otherObject) ||
            this._checkAxisCollision('y', this, otherObject)
        );
    };

    GameObject.prototype._checkAxisCollision = function(axis, obj1, obj2) {
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
    };

    GameObject.prototype.setDirectionByAngle = function(rot) {
        var dir = {
            x: Math.tan(rot),
            y: 1 / Math.tan(rot)
        };

        this._dir = nwo.normalize(dir);
    };

    GameObject.prototype.setRotation = function(vector) {
        if (vector && vector.x != null && vector.y != null) {
            this._rot = Math.atan(vector.y / vector.x);

            if (vector.x < 0) {
                this._rot += Math.PI;
            }

        } else if (vector != null) {
            this._rot = vector
        }
    };

    nwo.GameObject = GameObject;

})();
