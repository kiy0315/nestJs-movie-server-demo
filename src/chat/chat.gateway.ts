import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody()
    data: {
      userId: number;
      message: string;
      isAdmin?: boolean;
    },
  ) {
    const savedMessage = await this.chatService.saveMessage(
      data.userId,
      data.message,
    );
    const userIdString = data.userId.toString();

    if (data.isAdmin) {
      this.server.emit('newMessage', savedMessage);
    } else {
      this.server.to(userIdString).emit('newMessage', savedMessage);
    }
  }
}
