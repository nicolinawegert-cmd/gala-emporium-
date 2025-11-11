import { getClub, getEvents } from "../api.js";

export default async function loadPulseRoom() {
    const clubId = "tp45";

    const club = await getClub(clubId);
    const events = await getEvents(clubId);

    document.body.className = "the-pulse-room";

    return `
        <header>
            <h1 class="pulse-title">${club.name}</h1>
            <p class="tagline">${club.description}</p>
        </header>

        <main>
            <section class="event-grid">
                ${events.map(ev => `
                    <article class="event-card">
                        <img src="${ev.img}" alt="${ev.title}">
                        <h3>${ev.title}</h3>
                        <p><strong>${ev.date}</strong></p>
                        <details>
                            <summary>Mer info</summary>
                            <p>${ev.description}</p>
                        </details>
                    </article>
                `).join("")}
            </section>
        </main>

        <footer>
            <p>&copy; 2025 The Pulse Room</p>
        </footer>
    `;
}

