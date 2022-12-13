import { io } from 'socket.io-client';

export const socket = io('https://minhyeongi.xyz', {
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
});
