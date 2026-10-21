import { Controller, Get } from '@nestjs/common';
import { InvitationService } from './invitation.service';

@Controller('invitation')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Get()
  getInvitation() {
    return this.invitationService.getInvitation();
  }
}
