import { io } from 'socket.io-client';

export const socket = io('http://52.79.119.27:3000', {
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket', 'polling'],
});
