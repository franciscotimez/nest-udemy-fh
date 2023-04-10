import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wsServer: Server;

  constructor(private readonly messagesWsService: MessagesWsService) {}

  handleConnection(client: Socket) {
    this.messagesWsService.registerClient(client);
    this.wsServer.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );

    console.log('Cliente Conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wsServer.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );

    console.log('Cliente Desconectado:', client.id);
  }
}
