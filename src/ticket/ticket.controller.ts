import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/createTicket.dto';

@Controller('tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('reservation')
  async reservationTicket(@Body() createTicketDto: CreateTicketDto) {
    try {
      const ticket =
        await this.ticketService.reservationTicket(createTicketDto);
      return {
        statusCode: HttpStatus.CREATED,
        data: ticket,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }

  @Get(':ticketId')
  async getTicketById(@Param('ticketId') ticketId: number) {
    try {
      const ticket = await this.ticketService.getTicketById(ticketId);
      return {
        statusCode: HttpStatus.OK,
        data: ticket,
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Ticket not found',
      };
    }
  }


  @Delete(':ticketId')
  async deleteTicketById(@Param('ticketId') ticketId: number) {
    try {
      await this.ticketService.deleteTicketById(ticketId);
      return {
        statusCode: HttpStatus.OK,
        message: 'Ticket deleted successfully',
      };
    } catch (error) {
      return {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
      };
    }
  }
}
