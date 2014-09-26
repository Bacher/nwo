
(function() {

    var BAR_HEIGHT = 6 / nwo.PIXEL_RATIO;
    var BAR_OFFSET = 3 / nwo.PIXEL_RATIO;

    function Character(params) {
        params = params || {};

        nwo.TexturedObject.call(this, params);

        this._maxHp = params.maxHp || 100;
        this._hp = this._maxHp;

        this._drawStages.push('_drawHealthBar');
    }

    var base = nwo.TexturedObject.prototype;
    Character.prototype = Object.create(base);

    Character.prototype.hit = function(damage) {
        this._hp -= damage;

        if (this._hp <= 0) {
            this.destroy();
        }
    };

    Character.prototype._drawHealthBar = function() {
        var ctx = nwo.ctx[1];

        var pr = nwo.PIXEL_RATIO;

        var barWidth = this._size - 2/pr;
        var filledBy = barWidth * this._hp / this._maxHp;

        var x1 = this._pos.x - barWidth / 2 - 1/pr;
        var y1 = this._pos.y + this._size / 2 + BAR_OFFSET;

        ctx.fillStyle = '#000';
        ctx.fillRect(x1, y1 , this._size, BAR_HEIGHT);

        ctx.fillStyle = '#0F0';
        ctx.fillRect(x1 + 1/pr, y1 + 1/pr, filledBy, BAR_HEIGHT - 2/pr);
    };

    nwo.Character = Character;
})();
