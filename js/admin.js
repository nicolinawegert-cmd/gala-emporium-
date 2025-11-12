export default async function loadAdmin() {
  // 🔹 Create a container for the admin panel
  const container = document.createElement("section");
  container.classList.add("admin-container");

  document.body.className = "admin-page";

  const heading = document.createElement("h2");
  heading.textContent = "Admin Panel";
  container.appendChild(heading);

  /* ---------------- FORM ---------------- */
  const form = document.createElement("form");
  form.id = "event-form";
  form.classList.add("admin-form");

  form.innerHTML = `
    <input type="hidden" id="event-id" />
    <input type="text" id="event-title" placeholder="Title" required />
    <input type="text" id="event-club" placeholder="Club ID" required />
    <input type="date" id="event-date" required />
    <input type="time" id="event-time" required />
    <button type="submit">Save Event</button>
  `;

  container.appendChild(form);

  /* ---------------- EVENT LIST ---------------- */
  const eventList = document.createElement("div");
  eventList.id = "event-list";
  container.appendChild(eventList);

  const apiUrl = "http://localhost:3000/events";

  /* ---------------- EVENT DELEGATION FOR EDIT/DELETE BUTTONS ---------------- */
  // This listener works even when eventList.innerHTML is updated dynamically
  eventList.addEventListener("click", (e) => {
    const target = e.target;

    // Check if the clicked element has the class 'edit-btn'
    if (target.classList.contains("edit-btn")) {
      const id = target.dataset.id;
      editEvent(id);
    } 
    // Check if the clicked element has the class 'delete-btn'
    else if (target.classList.contains("delete-btn")) {
      const id = target.dataset.id;
      // Ask for confirmation before deleting (good practice!)
      if (confirm("Are you sure you want to delete this event?")) {
        deleteEvent(id);
      }
    }
  });

  /* ---------------- FETCH EVENTS ---------------- */
  async function fetchEvents() {
    const res = await fetch(apiUrl);
    const events = await res.json();

    if (events.length === 0) {
      eventList.innerHTML = "<p>No events found.</p>";
      return;
    }

    // Build the HTML list
    eventList.innerHTML = events.map(event => `
      <div class="admin-event-card">
        <h3>${event.title}</h3>
        <p>${event.date} - ${event.time}</p>
        <p><strong>Club ID:</strong> ${event.clubId}</p>
        <button class="edit-btn" data-id="${event.id}">Edit</button>
        <button class="delete-btn" data-id="${event.id}">Delete</button>
      </div>
    `).join("");

    // NOTE: No querySelectorAll here anymore! Event delegation handles it.
  }

  /* ---------------- HANDLE SUBMIT ---------------- */
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
      // Update event (PUT)
      await fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
    } else {
      // Create new event (POST)
      await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEvent)
      });
    }

    form.reset();
    document.getElementById("event-id").value = ""; // Clear the ID field
    fetchEvents();
  });

  /* ---------------- EDIT EVENT ---------------- */
  async function editEvent(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const event = await res.json();

    // Fill the form with existing data
    document.getElementById("event-id").value = event.id;
    document.getElementById("event-title").value = event.title;
    document.getElementById("event-club").value = event.clubId;
    document.getElementById("event-date").value = event.date;
    document.getElementById("event-time").value = event.time;
    
    // Scroll up to the form for better UX
    heading.scrollIntoView({ behavior: 'smooth' });
  }

  /* ---------------- DELETE EVENT ---------------- */
  async function deleteEvent(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    fetchEvents(); // Reload the list after deletion
  }

  // Load the events when the page starts
  await fetchEvents();

  return container;
}
