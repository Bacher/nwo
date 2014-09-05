
$(function() {

    window.hour = 7;

    window.w = {};

    w.resources = {
        wood: 0,
        rock: 0,
        cloth: 0,
        food: 10
    };

    w.social = {
        tire: 0
    };

    w.peasants = [];

    for (var i = 0; i < 10; i++) {
        w.peasants[i] = {
            //eat: 1,
            //health: 100,
            //tire: 0
        };
    }

});
