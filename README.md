# Wedding Invitation

A wedding invitation site and small NestJS API for wedding details and guest RSVPs.

## Requirements

- Node.js 20 or newer
- npm

## Run locally

```bash
npm install
npm run start:dev
```

The invitation is available at http://localhost:3000/. Guests open an olive envelope with a gold D&B seal to reveal four Canva pages. Leaves and white flowers fall beside the pages. Music starts when the envelope is opened, and a fixed speaker button controls playback. The site assets are in `public/`.

The API runs at http://localhost:3000/api by default. Set PORT to use a different port.

Open `/api` for a list of available endpoints.

## Endpoints

### GET /api/invitation

Returns the wedding details. Edit `src/invitation/invitation.service.ts` to replace the sample names, date, and venue.

### POST /api/rsvps

Creates an RSVP. Example body:

```json
{
  "name": "Sam Guest",
  "email": "sam@example.com",
  "attending": true,
  "guestCount": 2,
  "message": "Looking forward to it!"
}
```

`guestCount` includes the respondent. Use `0` when `attending` is `false`.

RSVP data is stored in server memory and is lost when the process restarts. Add a database before using this for real guest responses.

## Checks

```bash
npm run typecheck
npm test
npm run build
```
