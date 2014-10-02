(function() {

    function Missile(params) {
        this._name = this._name || 'missile';

        nwo.TexturedObject.call(this, _.extend({
            size: 0.1,
            texScale: 6,
            rotateTextureByDirection: true
        }, params));

        _.extend(this, {
            _baseDamage: params.baseDamage || 10,
            _critChance: params.critChance || 0
        });
    }

    var base = nwo.TexturedObject.prototype;
    Missile.prototype = Object.create(base);

    /**
     * @override
     * @private
     */
    Missile.prototype._updatePosition = function() {
        var delta = this._selfSpeed / 140;

        this._pos.x += this._dir.x * delta;
        this._pos.y += this._dir.y * delta;

        if (this._terrainCollision && !this._checkTerrainCollision(this._pos)) {
            this.destroy();
        }
    };

    Missile.prototype.getDamage = function() {
        var isCrit = Math.random() < this._critChance;
        var multiplier = isCrit ? 2 : 1;

        return {
            damage: (1 + Math.random() * 0.5) * (this._baseDamage + this._selfSpeed) * 1.5 * multiplier,
            type: isCrit ? 'crit' : 'normal'
        };
    };

    nwo.Missile = Missile;

})();
