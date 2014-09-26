

(function() {

    function Sprite(params) {
        this.d = 1;
        nwo.TexturedObject.call(this, params);
    }

    var base = nwo.TexturedObject.prototype;
    Sprite.prototype = Object.create(base);

    nwo.Sprite = Sprite;
})();
