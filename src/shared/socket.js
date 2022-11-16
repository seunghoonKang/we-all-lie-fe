import { io } from 'socket.io-client';

export const socket = io('http://3.36.53.193:3000', {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});
