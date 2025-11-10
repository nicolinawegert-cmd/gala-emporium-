import { getClub, getEvents } from "../api.js";

export default async function loadGiggleGalaxy() {
    const clubId = "gg01";

    const club = await getClub(clubId);
    const events = await getEvents(clubId);

    return `


export default async function loadGiggleGalaxy() {
      const main = document.querySelector("main");

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./css/pages/giggle-galaxy.css";
      document.head.appendChild(link);
      
      main.innerHTML = `
      <section class="giggle-header">
        <h2>Giggle Galaxy</h2>
        <p>Welcome to Giggle Galaxy - where laughter meets the stars!</p>
        </section>

        <section id="club-info"></section>
        <section id="event-list"></section>
      `;

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
      <h3>About Us</h3>
      <p>${giggleGalaxyClub.description}</p>
      `;
    }
  
    //Fetch all events from JSOn server
    const response = await fetch("http://localhost:3000/events");
    const events = await response.json();

    // Filter events that belong to Giggle Galaxy
    const giggleEvents = events.filter(event => event.clubId === "aa220");

    // Check if events exist
    if (giggleEvents.length > 0) {
      eventList.innerHTML = giggleEvents.map(event => `
       <div class="event-card">
       <h3>${event.title}</h3>
       <p>${event.date} - ${event.time}</p>
       </div>
        `).join("");
    } else {
      eventList.innerHTML = "<p>No events found for Giggle Galaxy</p>";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    eventList.innerHTML = "<p>Failed to load data. Please try again later.</p>";
  }
}
