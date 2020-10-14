((ns, io) => {

    if (!io){
       throw Error('Socket.io library is required.'); 
    }

    const BASE_URL = "http://35.157.80.184:8080";
    const MESSAGE_EVENT = 'message';

    const _manager = new io.Manager(BASE_URL, {
        reconnectionDelayMax: 10000
    });

    const _socket = _manager.socket("/");


    const sendMessage = (data) => {
        _socket.emit(MESSAGE_EVENT,{ message: data.message, user: data.user });
    };

    const receiveMessage = (cb) => {
        _socket.on(MESSAGE_EVENT, cb);
    };

    ns.SocketAdapter = {
        sendMessage,
        receiveMessage,
    };

})(window.Chat || {}, io);
