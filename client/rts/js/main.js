$(function() {

    var player = nwo.player;

    nwo.arrows = [];

    nwo.playerLogicIteration = function() {
        nwo.updatePosition(player);

        if (nwo.player.powerActive) {
            nwo.player.power = Math.min(100, nwo.player.power + 1);

        } else if (nwo.player.power) {
            if (nwo.player.power > 35) {
                nwo.arrows.push({
                    speed: 20 + player.power / 10,
                    dir: nwo.normalize(nwo.sub(nwo.cursor.pos, player.pos)),
                    pos: _.clone(player.pos)
                });
            }

            player.power = 0;
        }

        nwo.arrows.forEach(nwo.updatePosition);
        
        setTimeout(nwo.playerLogicIteration, 7);
    };

    nwo.drawCharactersIteration = function() {
        nwo.drawPlayer();

        nwo.arrows.forEach(function(arrow) {
            var ctx = nwo.ctx[1];

            ctx.save();

            ctx.translate(arrow.pos.x * 20, arrow.pos.y * 20);

            ctx.rotate(Math.atan(arrow.dir.y / arrow.dir.x));

            var tex = nwo.texture;

            var arrowDetails = tex.details['arrow'];

            ctx.drawImage(tex.image, arrowDetails[0], arrowDetails[1], arrowDetails[2], arrowDetails[3], -arrowDetails[2]/2, -arrowDetails[3]/2, arrowDetails[2], arrowDetails[3]);

            ctx.restore();
        });

        requestAnimationFrame(nwo.drawCharactersIteration, nwo.canvas[2]);
    };

    nwo.initCanvas();

    nwo.initUI();

    nwo.loadTexture('texture1').then(function(texture) {
        nwo.texture = texture;

        nwo.map = new nwo.Map(0);

        nwo.initCamera();

        nwo.drawMap();

        nwo.drawPlayer();

        nwo.initCursorHighlight();

        nwo.bindEventListeners();

        nwo.drawCharactersIteration();

        nwo.playerLogicIteration();
    });

    nwo.updatePosition = function(obj) {
        if (obj.dir.x || obj.dir.y) {

            var delta = obj.speed / 300;

            obj.pos.x += obj.dir.x * delta;
            obj.pos.y += obj.dir.y * delta;
        }
    };
    
    nwo.normalize = function(vector) {
        if (!vector.x && !vector.y) {
            return copy(vector);
        }

        if (!vector.x && vector.y) {
            return {
                x: 0,
                y: 1
            };
        }

        if (!vector.y && vector.x) {
            return {
                x: 1,
                y: 0
            };
        }

        var division = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

        return {
            x: vector.x / division,
            y: vector.y / division
        };
    };

    nwo.sub = function(vector1, vector2) {
        return {
            x: vector1.x - vector2.x,
            y: vector1.y - vector2.y
        };
    };

});
