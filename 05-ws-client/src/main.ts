import './style.css';
import { connectToServer } from './socker-client';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSocket - Client</h1>
    <span id="server-status">Offline</span>
  </div>
`;

// Connect to Socket
connectToServer();

