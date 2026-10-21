import { BadRequestException, Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateRsvpDto } from './dto/create-rsvp.dto';

export interface Rsvp {
  id: string;
  name: string;
  email: string;
  attending: boolean;
  guestCount: number;
  message?: string;
  createdAt: string;
}

@Injectable()
export class RsvpService {
  private readonly rsvps: Rsvp[] = [];

  create(dto: CreateRsvpDto): Rsvp {
    if (dto.attending && dto.guestCount < 1) {
      throw new BadRequestException('guestCount must be at least 1 when attending');
    }
    if (!dto.attending && dto.guestCount !== 0) {
      throw new BadRequestException('guestCount must be 0 when not attending');
    }

    const rsvp: Rsvp = {
      id: randomUUID(),
      name: dto.name.trim(),
      email: dto.email.toLowerCase(),
      attending: dto.attending,
      guestCount: dto.guestCount,
      message: dto.message?.trim(),
      createdAt: new Date().toISOString(),
    };
    this.rsvps.push(rsvp);
    return rsvp;
  }
}
