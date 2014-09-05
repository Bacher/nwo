
nwo.normalize = function(vector) {
    if (!vector.x && !vector.y) {
        return copy(vector);
    }

    if (!vector.x && vector.y) {
        return {
            x: 0,
            y: 1
        };
    }

    if (!vector.y && vector.x) {
        return {
            x: 1,
            y: 0
        };
    }

    var division = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

    return {
        x: vector.x / division,
        y: vector.y / division
    };
};

nwo.sub = function(vector1, vector2) {
    return {
        x: vector1.x - vector2.x,
        y: vector1.y - vector2.y
    };
};
