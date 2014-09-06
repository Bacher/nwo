
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
                nwo.textures[fileName] = texture;
                done();
            }
        };

        texture.image.onerror = function() {
            fail();
        };

        texture.image.src = RESOURCE_PATH + '/' + fileName;

        var jsonFileName = fileName.substr(0, fileName.lastIndexOf('.')) + '.json';

        $.ajax({
            url: RESOURCE_PATH + '/' + jsonFileName
        }).done(function(json) {
            texture.details = json;

            if (++state === 2) {
                nwo.textures[fileName] = texture;
                done()
            }

        }).fail(function() {
            fail();
        });
    });
};
