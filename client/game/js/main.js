$(function() {

    nwo.textures = {};
    nwo._gameObjects = [];
    nwo._destoyedObjects = [];
    nwo._renderPriorities = ['background', 'normal', 'overlay'];

    nwo.initCanvas();

    nwo.initUI();

    var waitLoad = [];

    waitLoad.push(
        nwo.loadTexture('character4.png'),
        nwo.loadTexture('texture1.png'),
        nwo.loadTexture('minecraft1.png'),
        nwo.loadTexture('water.jpg'),
        nwo.loadTexture('rotatle-character.png'),
        nwo.loadTexture('RE_Side_Character_Sprites_v1.0.png')
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

        nwo.player = new nwo.Player({
            pos: {
                x: 10,
                y: 10
            },
            size: 1,
            //tex: 'character4.png/archer1',
            tex: 'RE_Side_Character_Sprites_v1.0.png/steam-ninja__b-0',
            sprite: true
        });

        _.times(10, function() {
            var mob = new nwo.NPC({
                pos: nwo.generateRandomPosition(),
                size: 1,
                selfSpeed: 2,
                tex: 'texture1.png/bear'
            });

            while (!mob._checkTerrainCollision(mob._pos)) {
                mob.move(nwo.generateRandomPosition());
            }
        });

        nwo.initCursorHighlight();

        nwo.Input.bindEventListeners();

        logicIteration();

        drawIteration();
    };

    Promise.all(waitLoad)
        .catch(forwardError(new Error('Texture not loaded')))
        .then(nwo.play)
        .catch(forward);

    function logicIteration() {

        nwo._destoyedObjects.forEach(function(object) {
            var index;
            if ((index = nwo._gameObjects.indexOf(object)) >= 0) {
                nwo._gameObjects.splice(index, 1);
            }
        });

        nwo._destoyedObjects = [];

        nwo.time = window.performance.now();

        nwo._gameObjects.forEach(function(object) {
            object.updateLogic();
        });

        var missiles = nwo._gameObjects.filter(function(object) {
            return object instanceof nwo.Missile;
        });

        var characters = nwo._gameObjects.filter(function(object) {
            return object instanceof nwo.Character && !(object instanceof nwo.Player);
        });

        missiles.forEach(function(missile) {
            characters.forEach(function(character) {
                if (!missile.checkCollision(character)) {
                    var damageInfo = missile.getDamage();

                    character.hit(damageInfo.damage);

                    if (damageInfo.type === 'crit') {
                        new nwo.Sprite({
                            pos: missile._pos,
                            size: 0.8,
                            tex: 'texture1.png/red-dot',
                            lifeTime: 1000,
                            zIndex: 'overlay'
                        });
                    }

                    missile.destroy();
                }
            });
        });

        setTimeout(logicIteration, 7);
    }

    function drawIteration() {
        var ctx;

        nwo.cursor.pos.x = nwo.cursor.relPos.x + nwo.camera.pos.x;
        nwo.cursor.pos.y = nwo.cursor.relPos.y + nwo.camera.pos.y;

        nwo.cursor.hover.col = Math.round(nwo.cursor.pos.x);
        nwo.cursor.hover.row = Math.round(nwo.cursor.pos.y);

        if (nwo.needMapDraw ||
            nwo.cursor.hover.col !== nwo.cursor.hover._col ||
            nwo.cursor.hover.row !== nwo.cursor.hover._row
        ) {
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

        if (nwo.cursor.moved) {
            ctx = nwo.ctx[3];
            ctx.clearRect(0, 0, nwo.W, nwo.H);
            ctx.save();

            ctx.translate(nwo.cursor.client.x, nwo.cursor.client.y);

            ctx.fillStyle = '#F00';
            ctx.fillRect(-1, -5, 2, 10);
            ctx.fillRect(-5, -1, 10, 2);

            ctx.restore();

            nwo.cursor.moved = false;
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

        nwo._renderPriorities.forEach(function(layer) {
            nwo._gameObjects.forEach(function(obj) {
                if (obj._zIndex === layer) {
                    obj.draw();
                }
            });
        });

        ctx.restore();

        requestAnimationFrame(drawIteration, nwo.canvas[1]);
    }

    nwo.applyContext = function(ctx) {
        ctx.translate(nwo.W / 2, nwo.H / 2);
        ctx.scale(nwo.PIXEL_RATIO, nwo.PIXEL_RATIO);
        ctx.translate(-nwo.camera.pos.x, -nwo.camera.pos.y);
    };

    nwo.generateRandomPosition = function() {
        return {
            x: 4 + Math.random() * 10,
            y: 4 + Math.random() * 10
        };
    }
});

function forward(e) {
    _.defer(function() {
        throw e;
    });

    throw e;
}

function forwardError(e) {
    var error = new Error(e);

    return function() {
        forward(error);
    }
}
