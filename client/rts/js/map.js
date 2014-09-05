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

        this.height = mapPattern.length;
        this.width = mapPattern[0].length / 2;

        this.map = new Array(this.height);

        mapPattern.forEach(function(patternRow, rowN) {
            var row = new Array(that.width);

            for (var colN = 0; colN < that.width; colN++) {
                var cellSymbol = patternRow.charAt(colN * 2);

                row[colN] = CELL_MATCH[cellSymbol];
            }

            that.map[rowN] = row;
        });
    }

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
