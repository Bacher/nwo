
/**
 * @param {Object} params
 * @constructor
 */
function Community(params) {

    this._peasants = [];

    for (var i = 0; i < params.peasantCount; ++i) {
        var peasant = new Peasant();
        peasant.moveTo({ x: 40, y: 30 });

        this._peasants.push(peasant);
    }
}

Community.prototype.update = function(delta) {
    this._peasants.forEach(function(peasant) {
        peasant.update(delta);
    })
};

Community.prototype.draw = function() {
    this._peasants.forEach(function(peasant) {
        peasant.draw();
    })
};
