import { io } from 'socket.io-client';

export const socket = io('http://tastekim.shop:3000', {
  cors: {
    origin: 'http://localhost:3000',
  },
  transports: ['websocket', 'polling'],
});
