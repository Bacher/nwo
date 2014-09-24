
nwo.initCursorHighlight = function() {

    nwo.cursor = {
        clientPos: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        }
    };

    nwo.hover = {
        col: 0,
        row: 0
    };

    $('.canvas-wrapper').on('mousemove', function(e) {
        nwo.ctx[2].clearRect(0, 0, nwo.W, nwo.H);

        nwo.cursor.clientPos.x = e.clientX;
        nwo.cursor.clientPos.y = e.clientY;

        nwo.cursor.pos.x = (nwo.cursor.clientPos.x - nwo.W / 2) / nwo.PIXEL_RATIO + nwo.camera.pos.x;
        nwo.cursor.pos.y = (nwo.cursor.clientPos.y - nwo.H / 2) / nwo.PIXEL_RATIO + nwo.camera.pos.y;

        var col = Math.floor(e.clientX / nwo.PIXEL_RATIO);
        var row = Math.floor(e.clientY / nwo.PIXEL_RATIO);

        nwo.hover.col = col;
        nwo.hover.row = row;

        nwo.ctx[2].strokeStyle = '#F00';
        nwo.ctx[2].strokeRect(col * nwo.PIXEL_RATIO, row * nwo.PIXEL_RATIO, nwo.PIXEL_RATIO, nwo.PIXEL_RATIO);
    });

};
