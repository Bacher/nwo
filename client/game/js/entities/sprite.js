
nwo.Sprite = inherit('sprite', nwo.TexturedObject, {
    _ctor: function(params) {
        nwo.Sprite.base._ctor.call(this, _.extend({
            size: 1
        }, params));
    }
});
