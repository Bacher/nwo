
/**
 * Крестьянин.
 * @constructor
 */
function Peasant() {

    this.position = { x: 0, y: 0 };
    this.direction = { x: 0, y: 0 };
    this.seePoint = { x: 0, y: 0 };
    this.speedModification = 1;
}

/**
 * Мгновенное перемещает персонажа.
 * @param {Object} position
 */
Peasant.prototype.moveTo = function(position) {
    this.position.x = position.x;
    this.position.y = position.y;
};

/**
 * Обновить состояние.
 * @param {number} delta ms
 */
Peasant.prototype.update = function(delta) {

    this.position.x += delta * this.direction.x * this.speedModification;
    this.position.y += delta * this.direction.y * this.speedModification;
};

Peasant.prototype.draw = function() {
    var ctx = nwo.ctx;

    ctx.save();

    ctx.translate(this.position.x, this.position.y);

    ctx.fillStyle = '#00F';
    ctx.fillRect(-4, -4, 8, 8);

    ctx.restore();
};
