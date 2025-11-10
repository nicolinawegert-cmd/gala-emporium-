import { getClub, getEvents } from '../api.js';

export default async function loadJazzCorner() {
    const clubId = "a37c";
    const [club, events] = await Promise.all([
        getClub(clubId),  
        getEvents(clubId)     
    ]);

    return `
    
  `;
}
