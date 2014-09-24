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
        var ctx = nwo.ctx[0];

        var map = nwo.map;
        var rows = nwo.map.map;

        var center = nwo.camera.pos;

        if (center.x === 0) {
            return;
        }

        var topLeft = {
            x: center.x - nwo.CW / 2,
            y: center.y - nwo.CH / 2
        };

        var bottomRight = {
            x: center.x + nwo.CW / 2,
            y: center.y + nwo.CH / 2
        };

        var rowFrom = Math.round(topLeft.y);
        var rowTo = Math.round(bottomRight.y);

        var colFrom = Math.round(topLeft.x);
        var colTo = Math.round(bottomRight.x);

        for (var rowN = rowFrom; rowN <= rowTo; ++rowN) {

            var row = null;

            if (rowN >= 0 && rowN < map.rowsCount) {
                row = rows[rowN];
            }

            for (var colN = colFrom; colN <= colTo; ++colN) {

                var cell = CELL_TYPES.WATER;

                if (row && colN >= 0 && colN < map.colsCount) {
                    cell = row[colN];
                }

                var displayInfo = DISPLAY_MATCH[cell];

                if (displayInfo.tex) {
                    displayInfo.tex.forEach(function(texPath) {
                        texPath = texPath.split('/');

                        var tex = nwo.textures[texPath[0]];
                        var t = tex.details[texPath[1]];

                        ctx.drawImage(tex.image, t[0], t[1], t[2], t[3], colN - 0.5, rowN - 0.5, 1, 1);
                    });
                }
            }
        }

    };

})();
