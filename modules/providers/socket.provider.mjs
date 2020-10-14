import { Manager } from 'socket.io-client';

const manager = new Manager("http://35.157.80.184:8080", {
    reconnectionDelayMax: 10000
});

const socket = manager.socket("/", {
    query: {
        auth: "123"
    }
});

export default socket;