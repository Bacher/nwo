
nwo.bindEventListeners = function() {

    nwo.bindKeyboard();

    //nwo.bindMouse();

};

nwo.bindKeyboard = function() {
    var KEYS = {
        w: 87,
        s: 83,
        a: 65,
        d: 68,
        c: 67,
        space: 32,
        shift: 16
    };

    var KEY_CODES_MATCHING = {
        x: {
            '+': KEYS.d,
            '-': KEYS.a
        },
        y: {
            '+': KEYS.s,
            '-': KEYS.w
        }
    };

    var keysPressed = {};

    $(document).on('keydown keyup', function(e) {
        var which = e.which;

        //console.log(e.which);

        if (e.metaKey || e.ctrlKey) {
            return;
        }

        if (e.type === 'keyup') {
            delete keysPressed[which];
            recalcPlayerDirection();
        } else {
            if (!keysPressed[which]) {
                keysPressed[which] = true;
                recalcPlayerDirection();
            }
        }

        e.preventDefault();

    });

    function recalcPlayerDirection() {

        var direction = nwo.player.dir = {
            x: 0,
            y: 0
        };

        for (var axis in KEY_CODES_MATCHING) {
            var s = KEY_CODES_MATCHING[axis];

            for (var n in s) {
                if (keysPressed[s[n]]) {
                    direction[axis] += (n === '+' ? 1 : -1);
                }
            }
        }

        if (direction.x && direction.y) {
            direction.x *= 0.71;
            direction.y *= 0.71;
        }

        nwo.player.powerActive = keysPressed[KEYS.c];

        nwo.player.speedModification = keysPressed[KEYS.shift] ? 0.6 : 1;

        nwo.player.shieldUp = keysPressed[KEYS.space];
    }
};

//nwo.bindMouse = function() {
//
//    $(document).on('mousemove', function(e) {
//        nwo.player.seePoint.x = e.clientX;
//        nwo.player.seePoint.y = e.clientY;
//    });
//
//};
