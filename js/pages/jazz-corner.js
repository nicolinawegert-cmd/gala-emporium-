import { getClub, getEvents } from '../api.js';

export default async function loadJazzCorner() {
    const clubId = "a37c";
    const [club, events] = await Promise.all([
        getClub(clubId),  
        getEvents(clubId)     
    ]);
     document.body.className = "jazz-corner";


  const leftEvents = (events || []).slice(0, 2).map(ev => `
    <article class="event-card">
    <img src="${ev.img}" alt="${ev.title}">
      <h3>${ev.title}</h3>
      <p>${ev.date ?? ''}</p>
      <p>${ev.description ?? ''}</p>
    </article>
  `).join('');

  const rightEvents = (events || []).slice(2, 4).map(ev => `
    <article class="event-card">
    <img src="${ev.img}" alt="${ev.title}">
      <h3>${ev.title}</h3>
      <p>${ev.date ?? ''}</p>
      <p>${ev.description ?? ''}</p>
    </article>
  `).join('');

  return `
    <section class="page jazz-corner">
      <div class="jazz-layout">
        <div class="events-side left-side">
          ${leftEvents}
        </div>

        <div class="center-text">
          <h1 class="big-title">${club.name}</h1>
          <p class="subtitle">${club.description}</p>
        </div>

        <div class="events-side right-side">
          ${rightEvents}
        </div>
      </div>

      <footer class="page-footer">
        <p>&copy; Jazz Corner 2025</p>
      </footer>
    </section>
  `;
}