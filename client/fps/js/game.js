
$(function() {
    nwo.W = 800;
    nwo.H = 600;

    initCanvas();

    //bindEventListeners();

    nwo.gameObjects = [];

    nwo.gameObjects.push(new Community({
        peasantCount: 10
    }));

    logicUpdate();

    render();




});
