import { Manager } from "socket.io-client";
import { Socket } from "socket.io";

export const connectToServer = () => {
  // http://localhost:3000/socket.io/socket.io.js
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js");

  const socket = manager.socket("/");
  // console.log({ socket });

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  // * id="server-status"
  const serverStatusLabel = document.querySelector("#server-status")!;
  // * id="clients-ul"
  const clientsUl = document.querySelector("#clients-ul")!;

  socket.on("connect", () => {
    serverStatusLabel.innerHTML = "Online";
  });

  socket.on("disconnect", () => {
    serverStatusLabel.innerHTML = "Offline";
  });

  socket.on("clients-updated", (clients: string[]) => {
    let clientsListHtml = "";

    clients.forEach((clientId) => {
      clientsListHtml += `<li>${clientId}</li>`;
    });

    clientsUl.innerHTML = clientsListHtml;
  });
};
