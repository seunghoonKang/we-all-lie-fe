import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";

export const socket = io("http://3.36.53.193:3000", {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
  transports: ["websocket"],
});
