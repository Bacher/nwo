(function() {

    function Missile(params) {
        nwo.TexturedObject.call(this, _.extend({ size: params.size || 0.6 }, params));

        this._rotateByDir = true;
    }

    var base = nwo.TexturedObject.prototype;
    Missile.prototype = Object.create(base);

    nwo.Missile = Missile;

})();
