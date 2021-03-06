(function() {

    var BAR_OFFSET = 4 / nwo.PIXEL_RATIO;
    var BAR_WIDTH = 4 / nwo.PIXEL_RATIO;

    var MINIMAL_POWER_NEEDS = 35;

    var KEYS = nwo.Input.KEYS;

    var KEY_CODES_MATCHING = {
        x: {
            '+': KEYS.d,
            '-': KEYS.a
        },
        y: {
            '+': KEYS.s,
            '-': KEYS.w
        }
    };

    nwo.Player = inherit('player', nwo.Character, {
        _ctor: function(params) {
            params = _.extend(params, {
                collisions: { terrain: true }
            });

            base._ctor.call(this, _.extend({
                selfSpeed: 4
            }, params));

            _.extend(this, {
                _power: 0,
                _minimalPower: 35,
                _state: {
                    powerInc: false
                }
            });

            this._logicStages.push('_incPower');

            this._drawStages.push('_drawPowerBar');

            nwo.on('keyboard', this._onKeyboard.bind(this));
        },

        _updatePosition: function() {
            base._updatePosition.call(this);

            nwo.trigger('player-moved', this._pos);
        },

        _incPower: function() {

            if (this._state.powerInc) {
                this._power = Math.min(100, this._power + 1);

            } else if (this._power) {
                if (this._power > MINIMAL_POWER_NEEDS) {

                    new nwo.Missile({
                        tex: 'texture1.png/arrow',
                        selfSpeed: 4 + this._power / 10,
                        dir: nwo.normalize(nwo.sub(nwo.cursor.pos, this._pos)),
                        pos: _.clone(this._pos),
                        baseDamage: 10,
                        critChance: 0.15,
                        lifeTime: 4000,
                        collisions: {
                            terrain: true
                        }
                    });
                }

                this._power = 0;
            }
        },

        _drawPowerBar: function() {
            if (this._power) {
                var ctx = nwo.ctx[1];

                var pr = nwo.PIXEL_RATIO;

                var barHeight = this._size - 2 / pr;
                var filledBy = barHeight * this._power / 100;

                var x1 = this._pos.x + this._size / 2 + BAR_OFFSET;
                var y1 = this._pos.y - barHeight / 2 - 1 / pr;

                ctx.fillStyle = '#000';
                ctx.fillRect(x1, y1, BAR_WIDTH, this._size);

                ctx.fillStyle = (this._power > this._minimalPower ? '#0F0' : '#F00');
                ctx.fillRect(x1 + 1 / pr, y1 + 1 / pr + barHeight - filledBy, BAR_WIDTH - 2 / pr, filledBy);
            }
        },

        _onKeyboard: function(activeKeys) {
            var direction = {
                x: 0,
                y: 0
            };

            for (var axis in KEY_CODES_MATCHING) {
                var s = KEY_CODES_MATCHING[axis];

                for (var n in s) {
                    if (activeKeys[s[n]]) {
                        direction[axis] += (n === '+' ? 1 : -1);
                    }
                }
            }

            if (direction.x && direction.y) {
                direction.x *= 0.71;
                direction.y *= 0.71;
            }

            this.setDirection(direction);

            this._state.shieldUp = activeKeys[KEYS.space];
            this._state.powerInc = activeKeys[KEYS.space];

            this._state.fullSpeed = !Boolean(activeKeys[KEYS.shift]);
        }
    });

    var base = nwo.Player.base;

})();
