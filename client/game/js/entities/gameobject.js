
(function() {

    function GameObject(params) {
        params = params || {};

        var that = this;

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

        if (this._dir.x || this._dir.y) {
            this.setRotation(this._dir);
        }

        _.defer(function() {
            nwo.trigger('new-object', that);
        });
    }

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

        nwo.trigger('player-moved', this._pos);
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
