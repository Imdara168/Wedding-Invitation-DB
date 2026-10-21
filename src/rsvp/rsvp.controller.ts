import { Body, Controller, Post } from '@nestjs/common';
import { CreateRsvpDto } from './dto/create-rsvp.dto';
import { RsvpService } from './rsvp.service';

@Controller('rsvps')
export class RsvpController {
  constructor(private readonly rsvpService: RsvpService) {}

  @Post()
  create(@Body() dto: CreateRsvpDto) {
    return this.rsvpService.create(dto);
  }
}
