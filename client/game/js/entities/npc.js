
(function() {

    var baseConstructor = nwo.Character;
    var base = baseConstructor.prototype;

    function NPC(params) {
        params = params || {};

        baseConstructor.call(this, _.extend({
            collisions: { terrain: true }
        }, params));

        this._lastRandomDirection = 0;
        this._randomEvery = (1 + Math.random()) * 400;

        this._setRandomDirection();

        this._logicStages.push('_randomDirection');
    }

    NPC.prototype = Object.create(base);

    NPC.prototype._randomDirection = function() {
        if (this._lastRandomDirection + this._randomEvery < nwo.time) {

            this._directionAngle += Math.PI * (Math.random() - 0.5);
            this.setDirectionByAngle(this._directionAngle);

            this._lastRandomDirection = nwo.time;
        }
    };

    NPC.prototype._setRandomDirection = function() {
        this._directionAngle = Math.random() * 2 * Math.PI;
        this.setDirectionByAngle(this._directionAngle);
    };

    nwo.NPC = NPC;
})();
