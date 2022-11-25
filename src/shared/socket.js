import { io } from 'socket.io-client';

export const socket = io('https://minhyeongi.xyz', {
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket', 'polling'],
});
