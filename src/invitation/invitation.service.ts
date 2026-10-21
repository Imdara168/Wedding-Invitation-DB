import { Injectable } from '@nestjs/common';

@Injectable()
export class InvitationService {
  getInvitation() {
    return {
      couple: { partnerOne: 'Alex', partnerTwo: 'Jordan' },
      message: 'Together with our families, we invite you to celebrate our wedding.',
      date: '2027-06-12',
      time: '16:00',
      timeZone: 'Asia/Bangkok',
      venue: {
        name: 'Your venue name',
        address: 'Your venue address',
      },
      rsvpBy: '2027-05-12',
    };
  }
}
