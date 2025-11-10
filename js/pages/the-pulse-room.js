import { getClub, getEvents } from "../api.js";

export default async function loadPulseRoom() {
    const clubId = "tp45";

    const club = await getClub(clubId);
    const events = await getEvents(clubId);

    return `
        <section class="pulse-theme">
            <h1>${club.name}</h1>
            <p>${club.description}</p>
        </section>

        <section class="events">
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
    `;
}