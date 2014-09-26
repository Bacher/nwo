
nwo.initCanvas = function() {

    var $canvasWrapper = $('.canvas-wrapper');

    nwo.canvas = [];
    nwo.ctx = [];

    _.times(4, function() {
        var canvas = document.createElement('canvas');
        canvas.width = nwo.W;
        canvas.height = nwo.H;

        $canvasWrapper.append(canvas);

        nwo.canvas.push(canvas);
        nwo.ctx.push(canvas.getContext('2d'));
    });

};
