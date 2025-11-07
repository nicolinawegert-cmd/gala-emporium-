
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

document.querySelectorAll(".details-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const desc = btn.nextElementSibling;
    desc.classList.toggle("hidden");
    btn.textContent = desc.classList.contains("hidden") ? "Visa detaljer" : "Dölj detaljer";
  });
});


