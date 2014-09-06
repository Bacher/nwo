$(function() {

    nwo.textures = {};
    nwo._gameObjects = [];

    nwo.initCanvas();

    nwo.initUI();

    var waitLoad = [];

    waitLoad.push(
        nwo.loadTexture('character4.png'),
        nwo.loadTexture('texture1.png'),
        nwo.loadTexture('minecraft1.png'),
        nwo.loadTexture('water.jpg')
    );

    nwo.on('new-object', function(obj) {
        nwo._gameObjects.push(obj);
    });

    nwo.play = function() {
        nwo.map = new nwo.Map(0);

        nwo.initCamera();

        nwo.drawMap();

        new nwo.Player({
            pos: {
                x: 10,
                y: 10
            },
            size: 1,
            tex: 'character4.png/archer1'
        });

        nwo.initCursorHighlight();

        nwo.Input.bindEventListeners();

        logicIteration();

        drawIteration();
    };

    Promise.all(waitLoad)
        .then(nwo.play);
//        .catch(function() {
//            throw new Error('Texture not loaded');
//        });

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

        ctx.scale(nwo.PIXEL_RATIO, nwo.PIXEL_RATIO);

        nwo._gameObjects.forEach(function(obj) {
            obj.draw();
        });

        ctx.restore();

        requestAnimationFrame(drawIteration, nwo.canvas[1]);
    }

});
