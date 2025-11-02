document.addEventListener("DOMContentLoaded", () => {
  const eventList = document.getElementById("event-list");

  const exampleEvents = [
    { title: "Standup Supernova", date: "2025-11-10", time: "19:00" },
    { title: "Open Mic Asteroid", date: "2025-11-17", time: "18:30" },
  ];

  exampleEvents.forEach(event => {
    const div = document.createElement("div");
    div.classList.add("event-card");
    div.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.date} - ${event.time}<p>
    `;
    eventList.appendChild(div);
  });
});