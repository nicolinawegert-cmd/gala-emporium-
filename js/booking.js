export default async function loadBooking() {
  const container = document.createElement("section");
  container.classList.add("booking-page");

  document.body.className = "booking-page";

  const title = document.createElement("h1");
  title.textContent = "Booking Tickets";
  container.appendChild(title);

  const form = document.createElement("form");
  form.id = "booking-form";

  form.appendChild(createInput("name", "Full Name", "text"));
  form.appendChild(createInput("email", "Email Address", "email"));
  form.appendChild(createInput("tickets", "Number of Tickets", "number", { min: 1, max: 10 }));

  /* LOAD EVENTS ------------------------------ */

  let events = [];
  try {
    const eventRes = await fetch("http://localhost:3000/events");
    events = await eventRes.json();
  } catch (err) {
    console.error("Could not load events", err);
  }

  /* CLUB SELECT ------------------------------ */

  const labelClub = document.createElement("label");
  labelClub.textContent = "Select Club:";

  const selectClub = document.createElement("select");
  selectClub.name = "club";
  selectClub.required = true;

  const clubs = [
    { id: "tp45",  name: "The Pulse Room" },
    { id: "a37c",  name: "Jazz Corner" },
    { id: "gg01",  name: "Giggle Galaxy" },
    { id: "hh72",  name: "Rally House" }
  ];

  const defaultOptionClub = document.createElement("option");
  defaultOptionClub.value = "";
  defaultOptionClub.textContent = "-- Select a Club --";
  selectClub.appendChild(defaultOptionClub);

  clubs.forEach(club => {
    const opt = document.createElement("option");
    opt.value = club.id;
    opt.textContent = club.name;
    selectClub.appendChild(opt);
  });

  labelClub.appendChild(selectClub);
  form.appendChild(labelClub);

  /* EVENT SELECT ------------------------------ */

  const labelEvent = document.createElement("label");
  labelEvent.textContent = "Select Event:";

  const selectEvent = document.createElement("select");
  selectEvent.name = "event";
  selectEvent.required = true;

  selectEvent.innerHTML = `<option value="">-- Select an Event --</option>`;
  labelEvent.appendChild(selectEvent);
  form.appendChild(labelEvent);

  function updateEventDropdown(clubId) {
    selectEvent.innerHTML = `<option value="">-- Select an Event --</option>`;

    const filtered = events
      .filter(ev => ev.clubId === clubId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    filtered.forEach(ev => {
      const opt = document.createElement("option");
      opt.value = ev.id;  
      opt.textContent = `${ev.title} – ${ev.date} ${ev.time}`;
      selectEvent.appendChild(opt);
    });
  }

  function getEventTitle(eventId) {
    const ev = events.find(e => e.id == eventId);
    return ev ? ev.title : "Unknown Event";
  }

  /* PREFILL (FROM BOOK EVENT BUTTON) -------- */

  const savedClub  = localStorage.getItem("preselectClub");
  const savedEvent = localStorage.getItem("preselectEvent");

  if (savedClub) {
    selectClub.value = savedClub;
    updateEventDropdown(savedClub);
    localStorage.removeItem("preselectClub");
  }

  if (savedEvent) {
    setTimeout(() => {
      selectEvent.value = savedEvent;
    }, 50);

    localStorage.removeItem("preselectEvent");
  }

  /* UPDATE EVENTS WHEN CLUB CHANGES --------- */

  selectClub.addEventListener("change", () => {
    updateEventDropdown(selectClub.value);
  });

  /* SUBMIT BOOKING -------------------------- */

  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Book Now";
  form.appendChild(submitBtn);

  container.appendChild(form);

  const result = document.createElement("section");
  result.id = "booking-result";
  container.appendChild(result);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());
    const bookingNumber = Math.floor(Math.random() * 90000 + 10000);

    localStorage.setItem(bookingNumber, JSON.stringify(formData));

    result.innerHTML = `
      <h2>Booking Confirmed!</h2>
      <p>Booking Number: <strong>${bookingNumber}</strong></p>
      <p>Sent to: ${formData.email}</p>
      <p>Club: ${formData.club}</p>
      <p>Event: ${getEventTitle(formData.event)}</p>
      <p>Number of Tickets: ${formData.tickets}</p>
    `;

    form.reset();
    selectEvent.innerHTML = `<option value="">-- Select an Event --</option>`;
  });

  /* CANCEL BOOKING -------------------------- */

  const cancelTitle = document.createElement("h2");
  cancelTitle.textContent = "Cancel Your Booking";
  cancelTitle.style.marginTop = "40px";
  container.appendChild(cancelTitle);

  const cancelBox = document.createElement("div");
  cancelBox.classList.add("cancel-box");

  const cancelInput = document.createElement("input");
  cancelInput.type = "number";
  cancelInput.placeholder = "Enter Booking Number";
  cancelInput.id = "cancel-number";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel Booking";

  const cancelMessage = document.createElement("p");
  cancelMessage.id = "cancel-message";

  cancelBox.appendChild(cancelInput);
  cancelBox.appendChild(cancelBtn);
  cancelBox.appendChild(cancelMessage);
  container.appendChild(cancelBox);

  cancelBtn.addEventListener("click", () => {
    const number = cancelInput.value.trim();

    if (!number) {
      cancelMessage.textContent = "Please enter a booking number.";
      cancelMessage.style.color = "yellow";
      return;
    }

    if (localStorage.getItem(number)) {
      localStorage.removeItem(number);
      cancelMessage.textContent = `Booking #${number} has been cancelled.`;
      cancelMessage.style.color = "lime";
    } else {
      cancelMessage.textContent = "Booking not found.";
      cancelMessage.style.color = "red";
    }
  });

  return container.outerHTML;
}

/* INPUT CREATOR ----------------------------- */
function createInput(name, labelText, type, attributes = {}) {
  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.name = name;
  input.type = type;
  input.required = true;

  Object.entries(attributes).forEach(([key, value]) => (input[key] = value));

  label.appendChild(input);
  return label;
}
