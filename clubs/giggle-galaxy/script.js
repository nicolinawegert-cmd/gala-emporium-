document.addEventListener("DOMContentLoaded", async () => {
  const eventList = document.getElementById("event-list");

  try {
    //Fetch all events from JSOn server
    const response = await fetch("http://localhost:3000/events");
    const events = await response.json();

    // Filter events that belong to Giggle Galaxy
    const giggleGalaxy = events.filter(event => event.club === "Giggle Galaxy");

    // Check if events exist
    if (giggleGalaxy.length > 0) {
      giggleGalaxy.forEach(event => {
        const div = document.createElement("div");
        div.classList.add("event-card");
        div.innerHTML = `
          <h3>${event.title}</h3>
           <p>${event.date} - ${event.time}</p>
    `;
        eventList.appendChild(div);
      });
    } else {
      eventList.innerHTML = "<p>No events found for Giggle Galaxy</p>";
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    eventList.innerHTML = "<p>Failed to load events. Please try again later.</p>"
  }
});