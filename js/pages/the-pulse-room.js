export default async function loadPulseRoom() {
  const clubId = "the-pulse-room";

  const clubRes = await fetch(`https://localhost:3000/clubs/${clubId}`);
  const club = await clubRes.json();

  const eventsRes = await fetch(`https://localhost:3000/events?clubId=${clubId}`);
  const events = await eventsRes.json();

  return `
    <section class="club-header pulse-theme">
      <h1>${club.name}</h1>
      <p>${club.description}</p>
    </section>

    <section class="events-list">
      ${events.map(event => `
        <article class="event-card">
          <img src="${event.img}" alt="${event.title}">
          <h3>${event.title}</h3>
          <p><strong>${event.date}</strong></p>
          <details>
            <summary>More Info</summary>
            <p>${event.description}</p>
          </details>
        </article>
      `).join('')}
    </section>
  `;
}