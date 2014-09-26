(function() {

    function Missile(params) {
        nwo.TexturedObject.call(this, _.extend({ size: params.size || 0.6 }, params));

        this._rotateByDir = true;
    }

    var base = nwo.TexturedObject.prototype;
    Missile.prototype = Object.create(base);

    /**
     * @override
     * @private
     */
    Missile.prototype._updatePosition = function() {
        var delta = this._speed / 140;

        this._pos.x += this._dir.x * delta;
        this._pos.y += this._dir.y * delta;

        if (!this._checkTerrainCollision(this._pos)) {
            this.destroy();
        }
    };

    nwo.Missile = Missile;

})();
