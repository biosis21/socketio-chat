window.Chat = ((ns) => {

    const _events = {};

    const on = (eventName, cb) => {
        _events[eventName] = cb.bind(null);
    }

    const emit = (eventName, data) => {
        _events[eventName](data);
    }

    ns.PubSub = {
        on,
        emit,
    };

    return ns;

})(window.Chat || {});