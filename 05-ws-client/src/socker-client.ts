import { Manager } from 'socket.io-client';
import { Socket } from 'socket.io';

export const connectToServer = () => {

  // http://localhost:3000/socket.io/socket.io.js
  const manager = new Manager('http://localhost:3000/socket.io/socket.io.js');

  const socket = manager.socket('/');
  // console.log({ socket });

  addListeners(socket);

};

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector('#server-status')!;

  socket.on('connect', () => {
    serverStatusLabel.innerHTML = 'Online';
  });

  socket.on('disconnect', () => {
    serverStatusLabel.innerHTML = 'Offline';
  });
};