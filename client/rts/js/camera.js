
nwo.initCamera = function() {

    nwo.camera = {

        x: 0,
        y: 0,

        maxRow: Math.floor(((nwo.map.height * 20) - nwo.H) / 20),
        maxCol: Math.floor(((nwo.map.width * 20) - nwo.W) / 20),

        translate: function(vector) {
            this.x += vector[0];
            this.y += vector[1];

            nwo.drawMap();
        }
    };

};
