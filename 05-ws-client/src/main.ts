import "./style.css";
import { connectToServer } from "./socker-client";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

  </div>
`;

// Connect to Socket
connectToServer();
