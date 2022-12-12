import { io } from 'socket.io-client';

export const socket = io('https://wealllion.shop', {
  cors: {
    origin: '*',
  },
  transports: ['websocket', 'polling'],
});
