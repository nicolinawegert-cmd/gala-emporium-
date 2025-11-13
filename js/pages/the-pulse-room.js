import { getClub, getEvents } from "../api.js";

export default async function loadPulseRoom() {
    const clubId = "tp45";

    const club = await getClub(clubId);
    const events = await getEvents(clubId);

    document.body.className = "the-pulse-room";

   const html = `
        <header class="pulse-header">
            <h1 class="pulse-title">${club.name}</h1>
            <p class="pulse-tagline">${club.description}</p>
        </header>

        <main class="pulse-main">
            <section class="event-grid">
                ${events.map(ev => `
                    <article class="event-card">
                        <img src="${ev.img}" alt="${ev.title}">
                        <h3>${ev.title}</h3>
                        <p><strong>${ev.date}</strong></p>
                        <details>
                            <summary>More info</summary>
                            <p>${ev.description}</p>
                        </details>
                        <button 
                            class="book-event-btn" 
                            data-club="${clubId}" 
                            data-id="${ev.id}"
                            data-title="${ev.title}">
                            Book Event
                        </button>
                    </article>
                `).join("")}
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

    setTimeout(() => {
        document.querySelectorAll(".book-event-btn").forEach(btn => {
            btn.addEventListener("click", () => {

                localStorage.setItem("preselectClub", btn.dataset.club);
                localStorage.setItem("preselectEvent", btn.dataset.id);

                window.location.hash = "#booking";
            });
        });
    }, 0);

    return html;
}
