
var GAME_LOGIC_INTERVAL = 10;

function logicUpdate() {
    nwo.gameObjects.forEach(function(gameObj) {
        gameObj.update(GAME_LOGIC_INTERVAL);
    });

    setTimeout(logicUpdate, GAME_LOGIC_INTERVAL)
}
