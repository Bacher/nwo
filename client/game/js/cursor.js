
nwo.initCursorHighlight = function() {

    nwo.cursor = {
        pos: {
            x: 0,
            y: 0
        }
    };

    $('.ui').on('mousemove', function(e) {
        nwo.ctx[2].clearRect(0, 0, nwo.W, nwo.H);

        nwo.cursor.pos.x = e.clientX / nwo.PIXEL_RATIO;
        nwo.cursor.pos.y = e.clientY / nwo.PIXEL_RATIO;

        var col = Math.floor(e.clientX / nwo.PIXEL_RATIO);
        var row = Math.floor(e.clientY / nwo.PIXEL_RATIO);

        nwo.hover = {
            col: col,
            row: row
        };

        nwo.ctx[2].strokeStyle = '#F00';
        nwo.ctx[2].strokeRect(col * nwo.PIXEL_RATIO, row * nwo.PIXEL_RATIO, nwo.PIXEL_RATIO, nwo.PIXEL_RATIO);
    });

};
