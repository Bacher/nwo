
(function() {

    var baseConstructor = nwo.Character;
    var base = baseConstructor.prototype;

    function NPC(params) {
        params = params || {};

        baseConstructor.call(this, params);

        _.extend(this, {
            maxHp: params.maxHp || 100
        });
    }

    NPC.prototype = Object.create(base);

    nwo.NPC = NPC;
})();
