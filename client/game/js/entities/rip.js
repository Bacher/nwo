
(function() {

    var base = nwo.Sprite;

    function Rip(params) {
        this._name = 'rip';

        base.call(this, _.extend({
            tex: 'texture1.png/rip',
            zIndex: 'background'
        }, params));
    }

    Rip.prototype = Object.create(base.prototype);

    nwo.Rip = Rip;

})();
