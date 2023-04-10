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
  // * id="clients-ul"
  // * id="message-form"
  // * id="message-input"
  const serverStatusLabel = document.querySelector("#server-status")!;
  const clientsUl = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;

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

  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (messageInput.value.trim().length <= 0) return;

    socket.emit("message-from-client", {
      id: "yo",
      message: messageInput.value,
    });

    messageInput.value = "";
  });
};
