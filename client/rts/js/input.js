
nwo.Input = {};

nwo.Input.KEYS = {
    w: 87,
    s: 83,
    a: 65,
    d: 68,
    c: 67,
    space: 32,
    shift: 16
};

nwo.Input.bindEventListeners = function() {

    nwo.Input._bindKeyboard();

    //nwo.Input._bindMouse();

};

nwo.Input._bindKeyboard = function() {

    var keysPressed = {};

    $(document).on('keydown keyup', function(e) {
        var which = e.which;

        //console.log(which);

        if (e.metaKey || e.ctrlKey) {
            return;
        }

        if (e.type === 'keyup') {
            delete keysPressed[which];
            nwo.trigger('keyboard', keysPressed);
        } else {
            if (!keysPressed[which]) {
                keysPressed[which] = true;
                nwo.trigger('keyboard', keysPressed);
            }
        }

        e.preventDefault();

    });
};

//nwo.bindMouse = function() {
//
//    $(document).on('mousemove', function(e) {
//        nwo.player.seePoint.x = e.clientX;
//        nwo.player.seePoint.y = e.clientY;
//    });
//
//};
