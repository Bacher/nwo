
nwo.initCamera = function() {

    nwo.camera = {

        _pos: {
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
        camera._pos = newPos;

        nwo.needMapDraw = true;
    });
};
