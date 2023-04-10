import "./style.css";
import { connectToServer } from "./socker-client";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h2>WebSocket - Client</h2>

    <input id="jwt-token" placeholder="Json Web Token"/>
    <button id="btn-connect">Connect</button>

    <br/>
    <span id="server-status">Offline</span>

    <ul id="clients-ul"></ul>

    <form id="message-form">
      <input placeholder="message" id="message-input" />
    </form>

    <h3>Messages</h3>
    <ul id="messages-ul"></ul>

  </div>
`;

const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!;
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!;

btnConnect.addEventListener("click", () => {
  // Connect to Socket

  if (jwtToken.value.trim().length <= 0) return;

  connectToServer(jwtToken.value.trim());
});
