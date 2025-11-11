import { getClub, getEvents } from '../api.js';

export default async function loadJazzCorner() {
    const clubId = "a37c";
    const [club, events] = await Promise.all([
        getClub(clubId),  
        getEvents(clubId)     
    ]);
    document.body.className = "Jazz-corner";


return `
    <h1>${club.name}</h1>
    <p>${club.description}</p>
 `;}

  const top4 = (events || []).slice(0, 4);
  top4.map(ev => {ev.title})
