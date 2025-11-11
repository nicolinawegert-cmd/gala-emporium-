export default async function loadAdmin() {

  const main = document.querySelector("main");

  main.innerHTML = `
  <section class="admin-container">
    <h2>Admin Panel</h2>

    <form id="event-form" class="admin-form">
      <input type="hidden" id="event-id" />
      <input type="text" id="event-title" placeholder="Title" required />
      <input type="text" id="event-club" placeholder="Club ID" required />
      <input type="date" id="event-date" required />
      <input type="time" id="event-time" required />
      <button type="submit">Save Event</button>
    </form>

    <div id="event-list"></div>
  </section>
  `;

  const form = document.getElementById("event-form");
  const eventList = document.getElementById("event-list");
  const apiUrl = "http://localhost:3000/events";

  async function fetchEvents() {
    const res = await fetch(apiUrl);
    const events = await res.json();

    eventList.innerHTML = events.map(event => `
      <div class="event-card">
        <h3>${event.title}</h3>
        <p>${event.date} - ${event.time}</p>
        <p><strong>Club:</strong> ${event.clubId}</p>
        <button class="edit-btn" data-id="${event.id}">Edit</button>
        <button class="delete-btn" data-id="${event.id}">Delete</button>
      </div>
    `).join("");

    // Edit buttons
    document.querySelectorAll(".edit-btn").forEach(btn => {
      btn.addEventListener("click", () => editEvent(btn.dataset.id));
    });

    // Delete buttons
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", () => deleteEvent(btn.dataset.id));
    });
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("event-id").value;

    const newEvent = {
      title: document.getElementById("event-title").value,
      clubId: document.getElementById("event-club").value,
      date: document.getElementById("event-date").value,
      time: document.getElementById("event-time").value,
    };

    if (id) {
      // Update
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
    } else {
      // New
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
    }

    form.reset();
    document.getElementById("event-id").value = "";
    fetchEvents();
  });

  async function editEvent(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const event = await res.json();

    document.getElementById("event-id").value = event.id;
    document.getElementById("event-title").value = event.title;
    document.getElementById("event-club").value = event.clubId;
    document.getElementById("event-date").value = event.date;
    document.getElementById("event-time").value = event.time;
  }

  async function deleteEvent(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchEvents();
  }

  await fetchEvents();

  return main.innerHTML;  // 
}
