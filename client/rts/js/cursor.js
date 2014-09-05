
nwo.initCursorHighlight = function() {

    nwo.cursor = {
        pos: {
            x: 0,
            y: 0
        }
    };

    $('.ui').on('mousemove', function(e) {
        nwo.ctx[2].clearRect(0, 0, nwo.W, nwo.H);

        nwo.cursor.pos.x = e.clientX / 20;
        nwo.cursor.pos.y = e.clientY / 20;

        var col = Math.floor(e.clientX / 20);
        var row = Math.floor(e.clientY / 20);

        nwo.hover = {
            col: col,
            row: row
        };

        nwo.ctx[2].strokeStyle = '#F00';
        nwo.ctx[2].strokeRect(col * 20, row * 20, 20, 20);



        //

        console.log(nwo.normalize(nwo.sub(nwo.cursor.pos, nwo.player.pos)));
    });

};
