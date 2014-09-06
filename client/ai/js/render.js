
function render() {

    var ctx = nwo.ctx;

    ctx.clearRect(0, 0, nwo.W, nwo.H);

    ctx.save();

    nwo.gameObjects.forEach(function(gameObj) {
        gameObj.draw();
    });

    //ctx.translate(player.position.x, player.position.y);

    //ctx.fillStyle = '#F00';
    //ctx.fillRect(-4, -4, 8, 8);

    //var deltaX = player.position.x - player.seePoint.x;
    //var deltaY = player.position.y - player.seePoint.y;

    //var angle = Math.atan(deltaY / deltaX);

    //if (deltaX > 0) {
    //    angle += Math.PI;
    //}

    //ctx.rotate(angle);

    //ctx.translate(4, 0);

    //if (player.shieldUp) {
    //    ctx.fillStyle = '#0F0';
    //    ctx.fillRect(-2, -4, 4, 8);
    //} else {
    //    ctx.fillRect(-2, -2, 4, 4);
    //}

    //ctx.restore();


    //ctx.fillStyle = '#F00';
    //ctx.fillRect(player.seePoint.x - 2 , player.seePoint.y - 2, 4, 4);

    requestAnimationFrame(render);
}
