import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  // 메시지 저장
  async saveMessage(user_id: number, message: string) {
    return this.prisma.message.create({
      data: {
        user_id,
        message,
      },
    });
  }

  // 유저의 채팅 내역 조회
  async getUserMessages(userId: number) {
    return this.prisma.message.findMany({
      where: {
        user_id: userId,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }
}
