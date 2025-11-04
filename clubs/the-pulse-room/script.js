const events = [
  {
    title: "Rhythm Awakening",
    date: "2025-11-05",
    img: "../../assets/images/rhythm.jpg",
    description: "En dansperformance där ljus och ljud samspelar i realtid."
  },
  {
    title: "Neon Motion",
    date: "2025-11-12",
    img: "../../assets/images/neon-motion.jpg",
    description: "Elektronisk danskväll med live-DJ och visuell ljusshow."
  },
  {
    title: "Pulse Experiment",
    date: "2025-11-20",
    img: "../../assets/images/pulse-experiment.jpg",
    description: "Publiken styr musiken genom rörelse – känn rytmen på riktigt!"
  }
];

const eventList = document.getElementById("event-list");

events.forEach(e => {
  const card = document.createElement("div");
  card.classList.add("event-card");
  card.innerHTML = `
    <img src="${e.img}" alt="Bild från ${e.title}">
    <h3>${e.title}</h3>
    <p><strong>${e.date}</strong></p>
    <button class="details-btn">Visa detaljer</button>
    <p class="event-desc hidden">${e.description}</p>
  `;
  eventList.appendChild(card);
});

// Interaktivitet – visa/dölj beskrivning vid klick
document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const desc = btn.nextElementSibling;
    desc.classList.toggle("hidden");
    btn.textContent = desc.classList.contains("hidden") ? "Visa detaljer" : "Dölj detaljer";
  });
});
