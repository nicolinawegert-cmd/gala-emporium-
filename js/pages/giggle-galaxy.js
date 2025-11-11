// Import functions for fetching club and event data
import { getClub, getEvents } from "../api.js";

export default async function loadGiggleGalaxy() {
  const clubId = "gg01";

  //Fetch club details and its related events from API
  const club = await getClub(clubId);
  const events = await getEvents(clubId);

  //Create a unique container for Giggle Galaxy content
  const container = document.createElement('div');
  container.classList.add('giggle-galaxy');// wrapper for scoped css

  //Build the HTML content inside wrapper
  container.innerHTML = `
    <section class="gg-header">
      <h2>${club.name}</h2>
      <p>Where laughter meets the stars!</p>
    </section>

    <section class="gg-club">
      <h3>About Us</h3>
      <p>${club.description}</p>
    </section>

    <section class="gg-events">
      ${
        //Render all club events or show a fallback message
        events.length > 0
          ? events
              .map(
                (ev) => `
          <article class="gg-event-card">
            <h3>${ev.title}</h3>
            <p><strong>${ev.date}</strong> – ${ev.time}</p>
            <details>
              <summary>More info</summary>
              <p>${ev.description ? ev.description : "No description available."}</p>
            </details>
          </article>
        `
              )
              .join("")
          : `<p>No upcoming events at the moment.</p>`
      }
    </section>
  `;

  const main = document.querySelector('main');
  main.innerHTML = ''; // clear previous club content
  main.appendChild(container)
}
