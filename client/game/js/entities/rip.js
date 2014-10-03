
(function() {

    nwo.Rip = inherit('rip', nwo.Sprite, {
        _ctor: function(params) {
            nwo.Rip.base._ctor.call(this, _.extend({
                tex: 'texture1.png/rip',
                zIndex: 'background'
            }, params));
        }
    });

})();
