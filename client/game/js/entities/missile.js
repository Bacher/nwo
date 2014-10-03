(function() {

    nwo.Missile = inherit('missile', nwo.TexturedObject, {

        _ctor: function(params) {
            nwo.Missile.base._ctor.call(this, _.extend({
                size: 0.1,
                texScale: 6,
                rotateTextureByDirection: true
            }, params));

            _.extend(this, {
                _baseDamage: params.baseDamage || 10,
                _critChance: params.critChance || 0
            });
        },

        /**
         * @override
         * @private
         */
        _updatePosition: function() {
            var delta = this._selfSpeed / 140;

            this._pos.x += this._dir.x * delta;
            this._pos.y += this._dir.y * delta;

            if (this._terrainCollision && !this._checkTerrainCollision(this._pos)) {
                this.destroy();
            }
        },

        getDamage: function() {
            var isCrit = Math.random() < this._critChance;
            var multiplier = isCrit ? 2 : 1;

            return {
                damage: (1 + Math.random() * 0.5) * (this._baseDamage + this._selfSpeed) * 1.5 * multiplier,
                type: isCrit ? 'crit' : 'normal'
            };
        }
    });

})();
