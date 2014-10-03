
(function() {

    nwo.NPC = inherit('npc', nwo.Character, {
        _ctor: function(params) {
            params = params || {};

            nwo.NPC.base._ctor.call(this, _.extend({
                collisions: { terrain: true }
            }, params));

            this._lastRandomDirection = 0;
            this._randomEvery = (1 + Math.random()) * 400;

            this._setRandomDirection();

            this._logicStages.push('_randomDirection');
        },

        _randomDirection: function() {
            if (this._lastRandomDirection + this._randomEvery < nwo.time) {

                this._directionAngle += Math.PI * (Math.random() - 0.5);
                this.setDirection(this._directionAngle);

                this._lastRandomDirection = nwo.time;
            }
        },

        _setRandomDirection: function() {
            this._directionAngle = Math.random() * 2 * Math.PI;
            this.setDirection(this._directionAngle);
        }
    });

})();
