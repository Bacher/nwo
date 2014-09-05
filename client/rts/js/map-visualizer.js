
nwo.drawMap = function() {

    var CELL_SIZE = 20;

    var rowsOnScreen = Math.ceil(nwo.H / CELL_SIZE);
    var colsOnScreen = Math.ceil(nwo.W / CELL_SIZE);

    var CELL_TYPES = nwo.Map.CELL_TYPES;

    var DISPLAY_MATCH = {};
    DISPLAY_MATCH[CELL_TYPES.EMPTY] = {
        bg: '#89250E'
    };
    DISPLAY_MATCH[CELL_TYPES.ROCK] = {
        bg: '#615B5C'
    };
    DISPLAY_MATCH[CELL_TYPES.TREE] = {
        bg: '#89250E',//'#159910'
        tex: 'tree1'
    };
    DISPLAY_MATCH[CELL_TYPES.WATER] = {
        bg: '#0904DD'
    };

    var rows = nwo.map.map;

    var rowFrom = Math.floor(Math.max(0, nwo.camera.y) / CELL_SIZE);
    var rowTo = Math.min(rowFrom + rowsOnScreen, rows.length);

    var colFrom = Math.floor(Math.max(0, nwo.camera.x) / CELL_SIZE);
    var colTo = Math.min(colFrom + colsOnScreen, rows[0].length);

    for (var rowN = rowFrom; rowN <= rowTo; ++rowN) {

        var row = rows[rowN];

        for (var colN = colFrom; colN <= colTo; ++colN) {

            var cell = row[colN];

            var displayInfo = DISPLAY_MATCH[cell];

            nwo.ctx[0].fillStyle = displayInfo.bg;
            nwo.ctx[0].fillRect(colN * CELL_SIZE - nwo.camera.x, rowN * CELL_SIZE - nwo.camera.y, CELL_SIZE, CELL_SIZE);

            if (displayInfo.tex) {
                var texInfo = nwo.texture.details[displayInfo.tex];

                nwo.ctx[0].drawImage(nwo.texture.image,
                    texInfo[0],
                    texInfo[1],
                    texInfo[2],
                    texInfo[3],
                    colN * CELL_SIZE - nwo.camera.x,
                    rowN * CELL_SIZE - nwo.camera.y,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
    }

};
