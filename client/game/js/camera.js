
nwo.initCamera = function() {

    nwo.camera = {

        pos: {
            x: 0,
            y: 0
        }

    };

    nwo.on('player-moved', function(newPos) {
        nwo.camera.pos.x = newPos.x;
        nwo.camera.pos.y = newPos.y;

        nwo.needMapDraw = true;
    });
};
