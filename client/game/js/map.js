(function() {
    /**
     * Создает игровую карту.
     * @param {number} i
     * @param {object} params
     * @constructor
     */

    function Map(i, params) {
        var that = this;

        var mapPattern = Map.maps[i].map;

        this.rowsCount = mapPattern.length;
        this.colsCount = mapPattern[0].length / 2;

        this.map = new Array(this.rowsCount);

        mapPattern.forEach(function(patternRow, rowN) {
            var row = new Array(that.colsCount);

            for (var colN = 0; colN < that.colsCount; colN++) {
                var cellSymbol = patternRow.charAt(colN * 2);

                row[colN] = CELL_MATCH[cellSymbol];
            }

            that.map[rowN] = row;
        });
    }

    Map.prototype.checkCollision = function(boundBox) {
        var point1 = boundBox[0];
        var point2 = boundBox[1];

        var cellStart = {
            x: Math.floor(point1.x + 0.5),
            y: Math.floor(point1.y + 0.5)
        } ;

        var cellEnd = {
            x: Math.ceil(point2.x - 0.5),
            y: Math.ceil(point2.y - 0.5)
        };

        for (var x = cellStart.x; x <= cellEnd.x; ++x) {
            for (var y = cellStart.y; y <= cellEnd.y; ++y) {
                var cellType = this.map[y][x];
                if (cellType === CELL_TYPES.ROCK || cellType === CELL_TYPES.TREE) {
                    return false;
                }
            }
        }

        return true;
    };

    var CELL_TYPES = Map.CELL_TYPES = {
        EMPTY: 0,
        WATER: 300,
        TREE: 400,
        ROCK: 500
    };

    var CELL_MATCH = {
        ' ': CELL_TYPES.EMPTY,
        'L': CELL_TYPES.TREE,
        'H': CELL_TYPES.ROCK,
        '~': CELL_TYPES.WATER
    };

    Map.maps = [];

    nwo.Map = Map;

})();
