
(function() {

    function TexturedObject(params) {
        nwo.GameObject.call(this, params);

        var texPath = params.tex.split('/');

        var tex = nwo.textures[texPath[0]];

        _.extend(this, {
            _tex: {
                img: tex.image,
                details: tex.details[texPath[1]],
                scale: params.texScale || 1
            }
        });

        var t = this._tex.details;
        var texScale = this._size * this._tex.scale / Math.max(t[2], t[3]);

        this._texWidth = t[2] * texScale;
        this._texHeight = t[3] * texScale;

        this._drawStages.push('_drawTexture');
    }

    TexturedObject.prototype = Object.create(nwo.GameObject.prototype);

    TexturedObject.prototype._drawTexture = function() {
        var ctx = nwo.ctx[1];

        ctx.save();

        var pos = this._pos;
        var t = this._tex.details;

        ctx.translate(pos.x, pos.y);

        if (this._rotateByDir) {
            ctx.rotate(this._rot);
        }

        ctx.drawImage(this._tex.img,
            t[0], t[1], t[2], t[3],
            -this._texWidth / 2, -this._texHeight / 2, this._texWidth, this._texHeight
        );

        ctx.restore();
    };

    nwo.TexturedObject = TexturedObject;

})();
