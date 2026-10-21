import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { InvitationModule } from './invitation/invitation.module';
import { RsvpModule } from './rsvp/rsvp.module';

@Module({
  imports: [InvitationModule, RsvpModule],
  controllers: [AppController],
})
export class AppModule {}
