$(function() {

    nwo._gameObjects = [];

    nwo.initCanvas();

    nwo.initUI();

    var playerTexture;

    var tD1 = nwo.loadTexture('character4').then(function(tex) {
        playerTexture = tex;
    });

    var tD2 = nwo.loadTexture('texture1').then(function(tex) {
        nwo.texture = tex;
    });

    nwo.on('new-object', function(obj) {
        nwo._gameObjects.push(obj);
    });

    Promise.all([tD1, tD2]).then(function() {
        nwo.map = new nwo.Map(0);

        nwo.initCamera();

        nwo.drawMap();

        new nwo.Player({
            pos: {
                x: 10,
                y: 10
            },
            size: 1,
            tex: playerTexture,
            texName: 'archer1'
        });

        nwo.initCursorHighlight();

        nwo.Input.bindEventListeners();

        logicIteration();

        drawIteration();
    });



    function logicIteration() {

        nwo._gameObjects.forEach(function(obj) {
            obj.updateLogic();
        });

        setTimeout(logicIteration, 7);
    }

    function drawIteration() {
        var ctx = nwo.ctx[1];

        ctx.clearRect(0, 0, nwo.W, nwo.H);

        ctx.save();

        ctx.scale(20, 20);

        nwo._gameObjects.forEach(function(obj) {
            obj.draw();
        });

        ctx.restore();

        requestAnimationFrame(drawIteration, nwo.canvas[1]);
    }

});
