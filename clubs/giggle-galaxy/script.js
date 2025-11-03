document.addEventListener("DOMContentLoaded", async () => {
  const eventList = document.getElementById("event-list");
  const clubInfo = document.getElementById("club-info");

  try {
    // Fetch all clubs from JSON server
    const clubResponse = await fetch("http://localhost:3000/clubs");
    const clubs = await clubResponse.json();

    // Find Giggle Galaxy info
    const giggleGalaxyClub = clubs.find(club => club.name === "Giggle Galaxy");

    // If found, display club description
    if (giggleGalaxyClub && clubInfo) {
      clubInfo.innerHTML = `
      <h2>About Us</h2>
      <p>${giggleGalaxyClub.description}</p>
      `;
    }
  
    //Fetch all events from JSOn server
    const response = await fetch("http://localhost:3000/events");
    const events = await response.json();

    // Filter events that belong to Giggle Galaxy
    const giggleEvents = events.filter(event => event.club === "Giggle Galaxy");

    // Check if events exist
    if (giggleEvents.length > 0) {
      giggleEvents.forEach(event => {
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
    console.error("Error fetching data:", error);
    eventList.innerHTML = "<p>Failed to load data. Please try again later.</p>"
  }});
