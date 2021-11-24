import React from 'react';
import { io } from "socket.io-client";

const socketUrl = `http://172.16.240.16:3001`;

export const socket = io(socketUrl);
export const SocketContext = React.createContext();