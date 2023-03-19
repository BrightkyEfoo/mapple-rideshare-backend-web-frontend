import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'https://mapple-rideshare-backend-nau5m.ondigitalocean.app';

export const socket = io(URL , {
    autoConnect : false
});