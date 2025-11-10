import { getClub, getEvents } from "../api.js";

export default async function loadGiggleGalaxy() {
    const clubId = "gg01";

    const club = await getClub(clubId);
    const events = await getEvents(clubId);

    return `
        <section class="giggle-header">
            <h2>Giggle Galaxy</h2>
            <p>Where laughter meets the stars!</p>
        </section>

          <section id="club-info">
           <h3>About Us</h3>
          <p>${club.description}</p>
          </section>
          <section id="event-list"></section>
        
        <section class="events">
            ${events.map(ev => `
                <article class="event-card">
                    <h3>${ev.title}</h3>
                    <p><strong>${ev.date}</strong></p>
                    <details>
                        <summary>Mer info</summary>
                        <p>${ev.description}</p>
                    </details>
                </article>
            `).join("")}
        </section>
    `;
}

/*
 ` 
    <section class="giggle-header">
      <h2>Giggle Galaxy</h2>
      <p>Where laughter meets the stars!</p>
    </section>

    <section id="club-info"></section>
    <section id="event-list"></section>
  `;

  const clubInfo = document.getElementById("club-info");
  const eventList = document.getElementById("event-list");

  try {
    // ✅ Fetch club info using API.js
    const club = await getClub(clubId);

    clubInfo.innerHTML = `
      <h3>About Us</h3>
      <p>${club.description}</p>
    `;}

    // ✅ Fetch events for this club
    const events = await getEvents(clubId);

    if (events.length > 0) {
      eventList.innerHTML = events
        .map(
          (event) => 
        <div class="event-card">
          <h3>${event.title}</h3>
          <p>${event.date} – ${event.time}</p>
        </div>
      
        )
        .join("");
      } 
     
}
      */