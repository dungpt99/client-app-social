import { io } from "socket.io-client";

const socket = io('http://10.0.0.155:3000');
export default socket