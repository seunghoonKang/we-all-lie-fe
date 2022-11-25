import { io } from 'socket.io-client';

export const socket = io('https://tastekim.shop', {
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
});
