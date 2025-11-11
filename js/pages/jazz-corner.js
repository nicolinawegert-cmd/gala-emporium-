import { getClub, getEvents } from '../api.js';

export default async function loadJazzCorner() {
    const clubId = "a37c";
    const [club, events] = await Promise.all([
        getClub(clubId),  
        getEvents(clubId)     
    ]);
    document.body.className = "Jazz-corner";
 
     const top4 = (events || [])
    .slice(0, 4)
    .map(ev => `
      <article class="event-card">
        <h3 class="event-cardTitle">${ev.title}</h3>
        <p class="event-cardDate">${ev.date ?? ''}</p>
        <p class="event-cardDesc">${ev.description ?? ''}</p>
        <a class="event-cardCta" href="#booking" data-route="booking">Boka</a>
      </article>
    `).join('');

return `
    <section class="page jazz-corner">
    <header class="page-header">
      <h1 class="page-title">${club.name}</h1>
      <p class="page-tagline">${club.description}</p>
      </header>
      
    <section class="events">
      <h2 class="events__heading">Fyra jazzkvällar</h2>
      <div class="events-grid">
        ${top4}
      </div>
      </section>
  
  <footer>
    <p>&copy; Jazz Corner 2025</p>
  </footer>
  </section>
   
  `;
    }