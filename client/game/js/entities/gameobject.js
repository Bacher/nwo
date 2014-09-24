
(function() {

    function GameObject(params) {
        params = params || {};

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

            this._pos.x += this._dir.x * delta;
            this._pos.y += this._dir.y * delta;
        }
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

    GameObject.prototype.setRotation = function(vector) {
        if (vector && vector.x != null && vector.y != null) {
            this._rot = Math.atan(vector.y / vector.x)
        } else if (vector != null) {
            this._rot = vector
        }
    };

    nwo.GameObject = GameObject;

})();
