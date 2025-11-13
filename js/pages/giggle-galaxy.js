// Import functions for fetching club and event data
import { getClub, getEvents } from "../api.js";
import { attachBookEventHandlers } from "../bookEventHandler.js";

export default async function loadGiggleGalaxy() {
  const clubId = "gg01";

  // Fetch club details and its related events from API
  const club = await getClub(clubId);
  const events = await getEvents(clubId);

  // Set body class for page-specific theme
  document.body.className = "giggle-galaxy";

  // Return structured and semantic HTML
  const html = `
    <div class="gg-wrapper">
      <header class="gg-header">
        <h1 class="gg-title">${club.name}</h1>
        <p class="gg-tagline">Where laughter meets the stars!</p>
      </header>

      <main class="gg-layout">
        <section class="gg-about card">
          <h2>About Us</h2>
          <p>${club.description}</p>
        </section>

        <section class="gg-events">
          <h2>Upcoming Shows</h2>
          <div class="gg-event-list">
            ${
              events.length > 0
                ? events
                    .map(
                      (ev) => `
                <article class="gg-event-card">
                  <h3>${ev.title}</h3>
                  <p class="gg-event-meta"><strong>${ev.date}</strong> – ${ev.time}</p>
                  

                  <details>
                    <summary>More info</summary>
                    <p>${ev.description || "No description available."}</p>
                  </details>
                  
                  <button 
                    class="book-event-btn"
                    data-club="${clubId}"
                    data-id="${ev.id}">
                    Book Event
                  </button>

                </article>
              `
                    )
                    .join("")
                : `<p class="gg-no-events">No upcoming events at the moment.</p>`
            }
          </div>
        </section>
      </main>

      <footer class="gg-footer">
        <p>&copy; 2025 Giggle Galaxy Comedy Club</p>
      </footer>
    </div>
  `;

  setTimeout(() => attachBookEventHandlers(), 0);
  return html;
}










