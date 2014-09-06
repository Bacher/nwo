
(function() {

    function Character(params) {
        params = params || {};

        nwo.TexturedObject.call(this, params);

        _.extend(this, {
            maxHp: params.maxHp || 100
        });
    }

    var base = nwo.TexturedObject.prototype;
    Character.prototype = Object.create(base);

    nwo.Character = Character;
})();
