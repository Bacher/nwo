

(function() {

    function Sprite(params) {
        nwo.TexturedObject.call(this, _.extend({
            size: 1
        }, params));
    }

    var base = nwo.TexturedObject.prototype;
    Sprite.prototype = Object.create(base);

    nwo.Sprite = Sprite;
})();
