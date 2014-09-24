
nwo.initCamera = function() {

    nwo.camera = {

        pos: {
            x: 0,
            y: 0
        },

        screenWidth: Math.ceil(nwo.W / nwo.PIXEL_RATIO),
        screenHeight: Math.ceil(nwo.H / nwo.PIXEL_RATIO)

        //translate: function(vector) {
        //    this.x += vector[0];
        //    this.y += vector[1];
        //
        //    nwo.drawMap();
        //}
    };

    var camera = nwo.camera;

    nwo.on('player-moved', function(newPos) {
        camera.pos.x = newPos.x;
        camera.pos.y = newPos.y;

        nwo.needMapDraw = true;
    });
};
