export default async function loadAdmin() {
  // Dynamically load admin css

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "./css/pages/admin.css";
  document.head.appendChild(link);

  const main = document.querySelector("main");
  main.innerHTML = `
  <section class="admin-container">
    <h2>Admin Panel</h2>

    <form id="event-form" class="admin-form">
      <input type="hidden" id="event-id" />
      <input type="text" id="event-title" placeholder="Title" required />
      <input type="text" id="event-club" placeholder="Club" required />
      <input type="date" id="event-date" required />
      <input type="time" id="event-time" required />
      <button type="submit">Save Event</button>
      </form>

      <div id="event-list" class="event-list"></div>
      </section>
`;

  const form = document.getElementById("event-form");
  const eventList = document.getElementById("event-list");
  const apiUrl = "http://localhost:3000/events";

  // Fetch and display all events
  async function fetchEvents() {
    try {
      const response = await fetch(apiUrl);
      const events = await response.json();

      eventList.innerHTML = events
        .map(
          (event) => `
      <div class="event-card">
      <h3>${event.title}</h3>
      <p>${event.date} - ${event.time}</p>
      <p><strong>Club:</strong> ${event.club}</p>
      <div class="button-group">
        <button class="edit-btn" data-id="${event.id}">Edit</button>
        <button class="delete-btn" data-id="${event.id}">Delete</button>
        </div>
        </div>
      `
        )
        .join("");

      // Attach listeners for edit/delete buttons
      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => deleteEvent(btn.dataset.id));
      });

      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => editEvent(btn.dataset.id));
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      eventList.innerHTML = "<p>Failed to load events.</p>";
    }

  }


  // Save event
  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const id = document.getElementById("event-id").value;
    const newEvent = {
      title: document.getElementById("event-title").value,
      club: document.getElementById("event-club").value,
      date: document.getElementById("event-date").value,
      time: document.getElementById("event-time").value,
    };

    try {
      if (id) {
        await fetch(`${apiUrl}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      } else {
        await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEvent),
        });
      }

      form.reset();
      document.getElementById("event-id").value = "";
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
    }
  });

  // Edit event
  async function editEvent(id) {
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const event = await response.json();

      document.getElementById("event-id").value = event.id;
      document.getElementById("event-title").value = event.title;
      document.getElementById("event-club").value = event.club;
      document.getElementById("event-date").value = event.date;
      document.getElementById("event-time").value = event.time;
    } catch (error) {
      console.error("Error editing event:", error);
    }
  }

  // Delete event
  async function deleteEvent(id) {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        fetchEvents();
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  }


  //Initial fetch
  fetchEvents();


}