
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

/**
 * @param {Vector|number} vector
 */
nwo.getAngle = function(vector) {
    if (vector && vector.x != null && vector.y != null) {
        if (vector.x === 0 && vector.y === 0) {
            return 0;
        }

        var angle = Math.atan(vector.y / vector.x);

        if (vector.x < 0) {
            angle += Math.PI;
        }
        return angle;

    } else if (vector != null) {
        return vector
    }

    throw new Error('Not angle');
};

nwo.normalizeAngle = function(angle) {
    if (angle === -Infinity) {
        throw new Error('Angle does not be Infinity');
    }

    while (angle < 0) {
        angle += 2 * Math.PI;
    }

    return angle;
};

function inherit(name, parent, proto) {
    if (!(parent instanceof Function)) {
        proto = parent;
        parent = null;
    }

    function Ctor(params) {
        this._name = name;

        if (this._ctor) {
            this._ctor(params);
        }
    }

    if (parent) {
        Ctor.base = parent.prototype;
        Ctor.prototype = Object.create(Ctor.base);
    }

    _.extend(Ctor.prototype, proto);

    return Ctor;
}
