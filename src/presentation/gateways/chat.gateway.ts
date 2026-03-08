import { MensajeService } from '@/application/services/social/mensaje.service';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly mensajeService: MensajeService
  ) { }
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket) {
    console.log('Usuario conectado:', socket.id);
  }

  handleDisconnect(socket: Socket) {
    console.log('Usuario desconectado:', socket.id);
  }

  @SubscribeMessage('join-user')
  handleJoinUser(
    @MessageBody() userId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(userId);
    console.log(`Usuario ${userId} unido a su sala personal`);
  }

  @SubscribeMessage('join')
  handleJoinConversation(
    @MessageBody() conversationId: string,
    @ConnectedSocket() socket: Socket,
  ) {
    socket.join(conversationId);
    console.log(`Usuario unido a la conversación: ${conversationId}`);
  }

  @SubscribeMessage('mensaje')
  async handleMensaje(
    @MessageBody() datos: any,
    @ConnectedSocket() socket: Socket,
  ) {
    const {
      conversacionId,
      remitenteId,
      receptorId,
      contenido,
    } = datos;

    datos.userCreated = datos.remitenteId
    console.log('datos enviados ::: ', datos)
    const mensajeGuardado = await this.mensajeService.crear(datos);
    console.log('mensaje gurdadado ', mensajeGuardado)

    // Emitir a todos en la conversación
    this.server.to(conversacionId).emit('mensaje', mensajeGuardado);

    // Notificar al receptor
    /* this.server.to(receptorId).emit('nuevo-mensaje', {
      remitenteId,
      conversacionId,
      contenido,
    }); */
  }
}