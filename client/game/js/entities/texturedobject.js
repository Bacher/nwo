
(function() {

    function TexturedObject(params) {
        nwo.GameObject.call(this, params);

        this._tex = {
            img: null,
            details: null,
            scale: params.texScale || 1
        };

        this._extractTexture(params.tex.split('/'));

        this._drawStages.push('_drawTexture');
    }

    TexturedObject.prototype = Object.create(nwo.GameObject.prototype);

    TexturedObject.prototype._extractTexture = function(texPath) {
        this._tex._file = texPath[0];
        this._tex._name = texPath[1];

        var tex = nwo.textures[this._tex._file];

        this._tex.img = tex.image;
        this._tex.details = tex.details[this._tex._name];

        var t = this._tex.details;
        var texScale = this._size * this._tex.scale / Math.max(t[2], t[3]);

        this._texWidth = t[2] * texScale;
        this._texHeight = t[3] * texScale;
    };

    TexturedObject.prototype._drawTexture = function() {
        var ctx = nwo.ctx[1];

        ctx.save();

        var pos = this._pos;
        var t = this._tex.details;

        ctx.translate(pos.x, pos.y);

        if (this._rotateTextureByDirection) {
            ctx.rotate(this._texRotation);
        }

        ctx.drawImage(this._tex.img,
            t[0], t[1], t[2], t[3],
            -this._texWidth / 2, -this._texHeight / 2, this._texWidth, this._texHeight
        );

        ctx.restore();
    };

    nwo.TexturedObject = TexturedObject;

})();
