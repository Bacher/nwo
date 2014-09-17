(function() {

    var CELL_TYPES = nwo.Map.CELL_TYPES;

    var DISPLAY_MATCH = {};
    DISPLAY_MATCH[CELL_TYPES.EMPTY] = {
        //bg: '#89250E',
        tex: ['minecraft1.png/grass']
    };
    DISPLAY_MATCH[CELL_TYPES.ROCK] = {
        bg: '#615B5C'
    };
    DISPLAY_MATCH[CELL_TYPES.TREE] = {
        bg: '#89250E',//'#159910'
        tex: ['minecraft1.png/grass', 'texture1.png/tree1']
    };
    DISPLAY_MATCH[CELL_TYPES.WATER] = {
        bg: '#0904DD',
        tex: ['water.jpg/water']
    };

    nwo.drawMap = function() {
        var rows = nwo.map.map;

        var center = nwo.camera._pos;

        if (center.x === 0) {
            return;
        }

        var topLeft = {
            x: center.x - nwo.camera.screenWidth / 2,
            y: center.y - nwo.camera.screenHeight / 2
        };

        var bottomRight = {
            x: center.x + nwo.camera.screenWidth / 2,
            y: center.y + nwo.camera.screenHeight / 2
        };

        var rowFrom = Math.floor(Math.max(0, topLeft.y));
        var rowTo = Math.min(bottomRight.y, rows.length);

        var colFrom = Math.floor(Math.max(0, topLeft.x));
        var colTo = Math.min(bottomRight.x, rows[0].length);

        for (var rowN = rowFrom; rowN < rowTo; ++rowN) {

            var row = rows[rowN];

            for (var colN = colFrom; colN < colTo; ++colN) {

                var cell = row[colN];

                var displayInfo = DISPLAY_MATCH[cell];

                if (displayInfo.tex) {
                    displayInfo.tex.forEach(function(texPath) {
                        texPath = texPath.split('/');

                        var tex = nwo.textures[texPath[0]];
                        var t = tex.details[texPath[1]];

                        nwo.ctx[0].drawImage(tex.image, t[0], t[1], t[2], t[3], colN, rowN, 1, 1);
                    });
                }
            }
        }

    };

})();
