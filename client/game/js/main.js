$(function() {

    nwo.textures = {};
    nwo._gameObjects = [];
    nwo._destoyedObjects = [];

    nwo.initCanvas();

    nwo.initUI();

    var waitLoad = [];

    waitLoad.push(
        nwo.loadTexture('character4.png'),
        nwo.loadTexture('texture1.png'),
        nwo.loadTexture('minecraft1.png'),
        nwo.loadTexture('water.jpg')
    );

    nwo.on('object-created', function(obj) {
        nwo._gameObjects.push(obj);
    });

    nwo.on('object-destroyed', function(obj) {
        nwo._destoyedObjects.push(obj);
    });

    nwo.play = function() {
        nwo.map = new nwo.Map(0);

        nwo.initCamera();

        nwo.needMapDraw = true;

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

        nwo._destoyedObjects.forEach(function(obj) {
            var index;
            if (index = nwo._gameObjects.indexOf(obj) >= 0) {
                nwo._gameObjects.splice(index, 1);
            }
        });

        nwo._destoyedObjects = [];

        nwo.time = window.performance.now();

        nwo._gameObjects.forEach(function(obj) {
            obj.updateLogic();
        });

        setTimeout(logicIteration, 7);
    }

    function drawIteration() {
        var ctx;

        nwo.cursor.pos.x = nwo.cursor.relPos.x + nwo.camera.pos.x;
        nwo.cursor.pos.y = nwo.cursor.relPos.y + nwo.camera.pos.y;

        nwo.cursor.hover.col = Math.round(nwo.cursor.pos.x);
        nwo.cursor.hover.row = Math.round(nwo.cursor.pos.y);

        if (nwo.needMapDraw || nwo.cursor.hover.col !== nwo.cursor.hover._col || nwo.cursor.hover.row !== nwo.cursor.hover._row) {
            ctx = nwo.ctx[2];

            ctx.clearRect(0, 0, nwo.W, nwo.H);
            ctx.strokeStyle = '#F00';

            ctx.save();

            nwo.applyContext(ctx);

            ctx.lineWidth = 1 / nwo.PIXEL_RATIO;
            ctx.strokeRect(nwo.cursor.hover.col - 0.5, nwo.cursor.hover.row - 0.5, 1, 1);

            ctx.restore();

            nwo.cursor.hover._row = nwo.cursor.hover.row;
            nwo.cursor.hover._col = nwo.cursor.hover.col;
        }

        if (nwo.needMapDraw) {
            nwo.needMapDraw = false;

            ctx = nwo.ctx[0];

            ctx.clearRect(0, 0, nwo.W, nwo.H);

            ctx.save();

            nwo.applyContext(ctx);

            nwo.drawMap();

            ctx.restore();
        }

        ctx = nwo.ctx[1];

        ctx.clearRect(0, 0, nwo.W, nwo.H);

        ctx.save();

        nwo.applyContext(ctx);

        nwo._gameObjects.forEach(function(obj) {
            obj.draw();
        });

        ctx.restore();

        requestAnimationFrame(drawIteration, nwo.canvas[1]);
    }

    nwo.applyContext = function(ctx) {
        ctx.translate(nwo.W / 2, nwo.H / 2);
        ctx.scale(nwo.PIXEL_RATIO, nwo.PIXEL_RATIO);
        ctx.translate(-nwo.camera.pos.x, -nwo.camera.pos.y);
    };
});
