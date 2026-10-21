import { BadRequestException } from '@nestjs/common';
import { RsvpService } from './rsvp.service';

describe('RsvpService', () => {
  let service: RsvpService;

  beforeEach(() => {
    service = new RsvpService();
  });

  it('creates an attending RSVP', () => {
    const result = service.create({
      name: '  Sam  ',
      email: 'SAM@example.com',
      attending: true,
      guestCount: 2,
    });

    expect(result).toMatchObject({
      name: 'Sam',
      email: 'sam@example.com',
      attending: true,
      guestCount: 2,
    });
    expect(result.id).toBeTruthy();
  });

  it('rejects guests for a declined RSVP', () => {
    expect(() =>
      service.create({
        name: 'Sam',
        email: 'sam@example.com',
        attending: false,
        guestCount: 1,
      }),
    ).toThrow(BadRequestException);
  });
});
