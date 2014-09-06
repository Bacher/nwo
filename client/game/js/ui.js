
nwo.initUI = function() {

    var DIRECTIONS = {
        'left': [-1, 0],
        'right': [1, 0],
        'up': [0, -1],
        'down': [0, 1]
    };


    $('.game')
        .on('mousedown', function(e) {
            e.preventDefault();
        })
        .on('mousedown', '.arrow', function(e) {
            e.preventDefault();

            var direction = $(this).data('info');

            nwo.camera.translate(DIRECTIONS[direction]);
        });
};
