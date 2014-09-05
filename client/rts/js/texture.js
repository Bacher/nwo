
var RESOURCE_PATH = '../resources/images';

nwo.loadTexture = function(fileName) {

    return new Promise(function(done, fail) {

        var state = 0;

        var texture = {
            image: new Image(),
            details: null
        };

        texture.image.onload = function() {
            if (++state === 2) {
                done(texture)
            }
        };

        texture.image.onerror = function() {
            fail();
        };

        texture.image.src = RESOURCE_PATH + '/' + fileName + '.png';

        $.ajax({
            url: RESOURCE_PATH + '/' + fileName + '.json'
        }).done(function(json) {
            texture.details = json;

            if (++state === 2) {
                done(texture)
            }

        }).fail(function() {
            fail();
        });
    });
};
