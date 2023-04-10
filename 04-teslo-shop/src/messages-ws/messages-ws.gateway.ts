import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from '../auth/interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wsServer: Server;

  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;

    let jwtPayload: IJwtPayload;
    try {
      jwtPayload = this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, jwtPayload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    console.log({ jwtPayload });

    // ! Se pude hacer el join a una sala con: client.join('salaId')
    // ! Se puede emitir a una sala con this.wsServer.to('salaId').emit()

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

  // * "message-from-client"
  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto) {
    // * "message-from-server"
    // ! Emite al cliente remitente
    // client.emit('message-from-server', {
    //   fullName: client.id,
    //   message: payload.message || 'no-message',
    // });

    // !Emite a todos menos al remitente
    // client.broadcast.emit('message-from-server', {
    //   fullName: client.id,
    //   message: payload.message || 'no-message',
    // });

    // ! Emite a todos.
    this.wsServer.emit('message-from-server', {
      fullName: this.messagesWsService.getUserFullname(client.id),
      message: payload.message || 'no-message',
    });
  }
}
