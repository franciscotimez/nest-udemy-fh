import { Manager, Socket } from "socket.io-client";

export const connectToServer = (jwtToken: string) => {
  // http://localhost:3000/socket.io/socket.io.js
  const manager = new Manager("http://localhost:3000/socket.io/socket.io.js", {
    extraHeaders: {
      authentication: jwtToken,
    },
  });

  const socket = manager.socket("/");
  // console.log({ socket });

  addListeners(socket);
};

const addListeners = (socket: Socket) => {
  // * id="clients-ul"
  // * id="message-form"
  // * id="message-input"
  // * id="messages-ul"
  // * id="server-status"
  const clientsUl = document.querySelector("#clients-ul")!;
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!;
  const messageInput =
    document.querySelector<HTMLInputElement>("#message-input")!;
  const messagesUl = document.querySelector("#messages-ul")!;
  const serverStatusLabel = document.querySelector("#server-status")!;

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

  socket.on(
    "message-from-server",
    (payload: { fullName: string; message: string }) => {
      const newMessage = `
      <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
      </li>`;

      const li = document.createElement("li");

      li.innerHTML = newMessage;
      messagesUl.append(li);
    }
  );
};
