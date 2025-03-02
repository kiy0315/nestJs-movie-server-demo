import { Controller, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 특정 유저의 채팅 내역 조회
  @Get(':userId')
  getUserMessages(@Param('userId') userId: number) {
    return this.chatService.getUserMessages(userId);
  }
}
