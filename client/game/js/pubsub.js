
var handlers = {};

nwo.trigger = function(eventName, data) {
    if (handlers[eventName]) {
        handlers[eventName].forEach(function(callback) {
            callback(data);
        })
    }
};

nwo.on = function(eventName, callback) {
    handlers[eventName] = handlers[eventName] || [];

    handlers[eventName].push(callback);
};
