
(function() {

    var BAR_HEIGHT = 6 / nwo.PIXEL_RATIO;
    var BAR_OFFSET = 3 / nwo.PIXEL_RATIO;

    nwo.Character = inherit('character', nwo.TexturedObject, {
        _ctor: function(params) {
            params = params || {};

            nwo.Character.base._ctor.call(this, params);

            this._maxHp = params.maxHp || 100;
            this._hp = this._maxHp;

            this._dirTexPart = 'b';
            this._nextStepTime = 0;

            this._drawStages.push('_drawHealthBar');

            if (params.sprite) {
                this._drawStages.unshift('_chooseSpriteTexture');
            }
        },

        hit: function(damage) {
            this._hp -= damage;

            if (this._hp <= 0) {

                new nwo.Rip({
                    pos: this._pos,
                    lifeTime: 2000
                });

                this.destroy();
            }
        },

        _chooseSpriteTexture: function() {
            if (this._speed < 0.1) {
                this._texStep = 0;
            } else {
                var rot = nwo.normalizeAngle(this._rot);

                var PI4 = Math.PI / 4;
                var PI8 = Math.PI / 8;

                //            if (rot < PI8) {
                //                _dirTexPart = '_r';
                //            } else if (rot < 3 * PI8) {
                //                _dirTexPart = 'br';
                //            } else if (rot < 5 * PI8) {
                //                _dirTexPart = 'b_';
                //            } else if (rot < 7 * PI8) {
                //                _dirTexPart = 'bl'
                //            } else if (rot < 9 * PI8) {
                //                _dirTexPart = '_l';
                //            } else if (rot < 11 * PI8) {
                //                _dirTexPart = 'tl';
                //            } else if (rot < 13 * PI8) {
                //                _dirTexPart = 't_';
                //            } else if (rot < 15 * PI8) {
                //                _dirTexPart = 'tr';
                //            } else {
                //                _dirTexPart = '_r';
                //            }

                if (rot < 0.9 * PI4) {
                    this._dirTexPart = 'r';
                } else if (rot < 3.1 * PI4) {
                    this._dirTexPart = 'b';
                } else if (rot < 4.9 * PI4) {
                    this._dirTexPart = 'l';
                } else if (rot < 7.1 * PI4) {
                    this._dirTexPart = 't'
                } else if (rot < 8.9 * PI4) {
                    this._dirTexPart = 'r';
                } else {
                    this._dirTexPart = 'b'
                }

                if (this._nextStepTime < nwo.time) {
                    this._texStep++;

                    if (this._texStep === 3) {
                        this._texStep = 0;
                    }

                    this._nextStepTime = nwo.time + 200;
                }
            }

            this._extractTexture([this._tex._file, 'steam-ninja__' + this._dirTexPart + '-' + this._texStep]);
        },

        _drawHealthBar: function() {
            var ctx = nwo.ctx[1];

            var pr = nwo.PIXEL_RATIO;

            var barWidth = this._size - 2 / pr;
            var filledBy = barWidth * this._hp / this._maxHp;

            var x1 = this._pos.x - barWidth / 2 - 1 / pr;
            var y1 = this._pos.y + this._size / 2 + BAR_OFFSET;

            ctx.fillStyle = '#000';
            ctx.fillRect(x1, y1, this._size, BAR_HEIGHT);

            ctx.fillStyle = '#0F0';
            ctx.fillRect(x1 + 1 / pr, y1 + 1 / pr, filledBy, BAR_HEIGHT - 2 / pr);
        }

    });

})();
