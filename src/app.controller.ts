import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getApiInfo() {
    return {
      message: 'Wedding Invitation API',
      endpoints: {
        invitation: 'GET /api/invitation',
        rsvps: 'POST /api/rsvps',
      },
    };
  }
}
