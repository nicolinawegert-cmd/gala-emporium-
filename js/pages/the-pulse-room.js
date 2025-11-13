import { getClub, getEvents } from "../api.js";
import { attachBookEventHandlers } from "../bookEventHandler.js";

export default async function loadPulseRoom() {
    const clubId = "tp45";

    const club = await getClub(clubId);
    const events = await getEvents(clubId);

    const eventCards = events.map(ev => {
        const hasImage = Boolean(ev.img && ev.img.trim());
        const mediaMarkup = hasImage
            ? `<img src="${ev.img}" alt="${ev.title}">`
            : `
                <div class="event-card-placeholder" role="img" aria-label="${ev.title} image coming soon">
                    <span>Image coming soon</span>
                </div>
            `;

        return `
            <article class="event-card">
                ${mediaMarkup}
                <h3>${ev.title}</h3>
                <p><strong>${ev.date}</strong></p>
                <details>
                    <summary>More info</summary>
                    <div class="event-details-body">
                        <p>${ev.description ?? "More info coming soon."}</p>
                    </div>
                </details>
                <button 
                    class="book-event-btn" 
                    data-club="${clubId}" 
                    data-id="${ev.id}"
                    data-title="${ev.title}">
                    Book Event
                </button>
            </article>
        `;
    }).join("");

    document.body.className = "the-pulse-room";

    const html = `
        <header class="pulse-header">
            <h1 class="pulse-title">${club.name}</h1>
            <p class="pulse-tagline">${club.description}</p>
        </header>

        <main class="pulse-main">
            <section class="event-grid">
                ${eventCards}
            </section>

            <footer class="pulse-footer">
                <div class="pulse-footer-inner">
                    <h2 class="pulse-footer-title">The Pulse Room</h2>
                    <p class="pulse-footer-sub">Feel the rhythm. Live the night.</p>

                    <div class="pulse-footer-links">
                        <a href="#start">Home</a>
                        <a href="#booking">Booking</a>
                    </div>

                    <p class="pulse-footer-copy">© 2025 The Pulse Room – All Rights Reserved</p>
                </div>
            </footer>
        </main>
    `;

    setTimeout(() => attachBookEventHandlers(), 0);
    return html;
}
