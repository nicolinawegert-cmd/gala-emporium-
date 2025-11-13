# Gala Emporium

A front-end project using HTML, CSS, and vanilla JavaScript that showcases multiple club pages with events, booking, and a simple admin interface. A local JSON API runs via `json-server` and serves data from `data/db.json`.

## Contents
- Overview and features
- Getting started (install and run)
- API and data
- Project structure
- Development details and known limitations

## Overview
The app is a small SPA using hash routing (for example `#start`, `#the-pulse-room`). The navigation menu is generated dynamically and each “page” is loaded from modules under `js/`. Club and event data are fetched from a local `json-server` at `http://localhost:3000`.

### Features
- Start: Displays upcoming events sorted by date.
- Club pages: The Pulse Room, Jazz Corner, Giggle Galaxy, and Rally House with unique layouts and event listings.
- Booking: A ticket booking form with club and event selection. Bookings are stored in `localStorage` and can be canceled using the booking number.
- Admin: CRUD for events (create, update, delete) against `json-server`.
- Rally House special: A very simple demo “admin login” using the `passwords` collection plus a music player for demo tracks.

## Getting Started

### Prerequisites
- Node.js (recommended ≥ 18)

### Installation
1. Install dependencies:
   - `npm install`
2. Start the local API (json-server):
   - `npm start`
   - The server runs on `http://localhost:3000` and reads from `data/db.json`.
3. Serve the frontend:
   - Open `index.html` using a static server (e.g., VS Code Live Server) to avoid CORS/`file://` issues.
   - With Live Server: right‑click `index.html` → “Open with Live Server”.

When both the frontend and API are running:
- Visit the app via your local server URL (e.g., `http://127.0.0.1:5500/index.html`).
- Ensure the API responds at `http://localhost:3000`.

## API and Data
The JSON API is exposed by `json-server` using `data/db.json`.

### Key endpoints
- `GET /clubs` – all clubs
- `GET /clubs/:id` – a single club
- `GET /events` – all events
- `GET /events?clubId=ID` – events filtered by club
- `POST /events` – create an event
- `PUT /events/:id` – update an event
- `DELETE /events/:id` – delete an event
- `GET /passwords` – used by the Rally House page for a simple admin check (demo only)

Note: The password in `db.json` is plain text and intended only for demo/development.

## Project Structure

```
.
├─ index.html                 # Root HTML that loads js/main.js
├─ data/db.json               # json-server datasource (clubs, events, etc.)
├─ js/
│  ├─ main.js                 # Routing, menu, and page loading
│  ├─ api.js                  # Fetch helpers for the JSON API
│  ├─ booking.js              # Booking flow + localStorage
│  ├─ admin.js                # Admin UI for event CRUD
│  └─ pages/                  # Page modules
│     ├─ start.js
│     ├─ the-pulse-room.js
│     ├─ jazz-corner.js
│     ├─ giggle-galaxy.js
│     └─ rally-house.js
├─ css/
│  ├─ utils/style.css         # Base styles and shared rules
│  └─ pages/*.css             # Page-specific styles
├─ assets/
│  ├─ images/                 # Posters and other images
│  └─ songs/                  # Demo tracks (Rally House)
├─ package.json               # Scripts and dependencies (json-server)
└─ README.md                  # This file
```

## Development Details
- Hash routing: `js/main.js` builds the menu and loads modules based on `location.hash`.
- Body class per page: each page module sets `document.body.className` to enable page-specific CSS in `css/pages/*`.
- Booking preselect: “Book Event” on club pages stores preselected IDs in `localStorage` so the Booking page can prefill.
- Admin flow: `js/admin.js` uses `fetch` against `http://localhost:3000/events` to create/update/delete events.

## Known Limitations
- Some special characters (e.g., from JSON text) may render oddly depending on environment/encoding—ensure UTF‑8 throughout.
- No server-side validation/security—this project is intended for learning/demo use.
- `docs/` contains empty files (`reflections.md`, `userstories.md`) that you can fill in as needed.

## Scripts
- `npm start` – starts json-server at `http://localhost:3000`.

## License
ISC (as specified in `package.json`).