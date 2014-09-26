(function() {

    function Missile(params) {
        nwo.TexturedObject.call(this, _.extend({
            size: 0.1,
            texScale: 6
        }, params));

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

        if (this._terrainCollision && !this._checkTerrainCollision(this._pos)) {
            this.destroy();
        }
    };

    Missile.prototype.getDamage = function() {
        return (1 + Math.random() * 0.5) * (7 + this._speed) * 1.5;
    };

    nwo.Missile = Missile;

})();
