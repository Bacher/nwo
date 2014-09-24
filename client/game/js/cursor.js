
nwo.initCursorHighlight = function() {

    nwo.cursor = {
        pos: {
            x: 0,
            y: 0
        },
        relPos: {
            x: 0,
            y: 0
        },
        hover: {
            col: 0,
            row: 0
        }
    };

    $('.canvas-wrapper').on('mousemove', function(e) {
        nwo.cursor.relPos.x = (e.clientX - nwo.W / 2) / nwo.PIXEL_RATIO;
        nwo.cursor.relPos.y = (e.clientY - nwo.H / 2) / nwo.PIXEL_RATIO;
    });

};
