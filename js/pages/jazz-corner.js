import { getClub, getEvents } from '../api.js';

export default async function loadJazzCorner() {
    const clubId = "a37c";
    const [club, events] = await Promise.all([
        getClub(clubId),  
        getEvents(clubId)     
    ]);
    document.body.className = "Jazz-corner";
 
     const top4 = (events || []).slice(0, 4)
    .map(ev => `
      <div>
        <h3>${ev.title}</h3>
        <p>${ev.date ?? ''}</p>
        <p>${ev.description ?? ''}</p>
        <a href="#booking" data-route="booking">Boka</a>
      </div>
    `).join('');

return `
    <h1>${club.name}</h1>
    <p>${club.description}</p>

    <h2>Fyra jazzkvällar</h2>
    <div>
      ${top4}
    </div>
  `;
}