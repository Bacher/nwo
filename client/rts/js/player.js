
nwo.player = {
    pos: {
        x: 10,
        y: 10
    },
    dir: {
        x: 0,
        y: 0
    },
    seePoint: {
        x: 0,
        y: 0
    },
    power: 0,
    size: 20,
    tex: null,
    powerActive: false,
    speed: 10
};

nwo.loadTexture('character4').then(function(tex) {
    nwo.player.tex = tex;
});

nwo.drawPlayer = function() {
    var texInfo = nwo.player.tex.details['archer1'];

    var ctx = nwo.ctx[1];

    ctx.clearRect(0, 0, nwo.W, nwo.H);

    ctx.save();

    ctx.translate(nwo.camera.x, nwo.camera.y);

    ctx.drawImage(nwo.player.tex.image,
        texInfo[0],
        texInfo[1],
        texInfo[2],
        texInfo[3],
        nwo.player.pos.x * 20 - nwo.player.size / 2,
        nwo.player.pos.y * 20 - nwo.player.size / 2,
        nwo.player.size,
        nwo.player.size
    );

    nwo.drawPowerBar();

    ctx.restore();
};

nwo.drawPowerBar = function() {
    if (nwo.player.power) {
        var ctx = nwo.ctx[1];

        ctx.strokeStyle = '#000';
        ctx.strokeRect(
            nwo.player.pos.x * 20 + nwo.player.size / 2 + 4,
            nwo.player.pos.y * 20 - nwo.player.size / 2,
            4,
            nwo.player.size
        );

        ctx.fillStyle = (nwo.player.power > 35 ? '#0F0' : '#F00');

        ctx.fillRect(
            nwo.player.pos.x * 20 + nwo.player.size / 2 + 4 + 1,
            nwo.player.pos.y * 20 - nwo.player.size / 2 + 1 + (18 - 18 * (nwo.player.power / 100)),
            2,
            18 * (nwo.player.power / 100)
        );
    }
};
