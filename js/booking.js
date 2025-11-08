export default async function loadBooking() {
  const container = document.createElement("section");
  container.classList.add("booking-page");

  const title = document.createElement("h1");
  title.textContent = "Booking tickets";
  container.appendChild(title);

  const form = document.createElement("form");
  form.id = "booking-form";

  form.appendChild(createInputField("name", "Full Name", "text"));
  form.appendChild(createInputField("email", "Email Address", "email"));
  form.appendChild(createInputField("tickets", "Number of Tickets", "number", { min: 1, max: 10 }));

  const labelClub = document.createElement("label");
  labelClub.textContent = "Select Club:";

  const select = document.createElement("select");
  select.name = "club";
  select.required = true;

  const clubs = [
    { id: "the-pulse-room", name: "The Pulse Room" },
    { id: "jazz-corner", name: "Jazz Corner" },
    { id: "giggle-galaxy", name: "Giggle Galaxy" },
    { id: "rally-house", name: "Rally House" }
  ];

  const defaultOption = document.createElement("option");
  defaultOption.textContent = "-- Select a Club --";
  defaultOption.value = "";
  select.appendChild(defaultOption);

  clubs.forEach(club => {
    const option = document.createElement("option");
    option.value = club;
    option.textContent = club.replace("-"," ");
    select.appendChild(option);
  });
  
  labelClub.appendChild(select);
  form.appendChild(labelClub);

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Book Now";
  form.appendChild(button);

  container.appendChild(form);

  const result = document.createElement("section");
  result.id = "booking-result";
  container.appendChild(result);

  form.addEventListner("submit", e => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form).entries());

    const bookingNumber = Math.floor(Math.random() * 90000 + 10000);

    result.innerHTML = `
      <h2>Booking Confirmed!</h2>
      <p>Booking Number: <strong>${bookingNumber}</strong></p>
      <p>Sent to: ${formData.email}</p>
      <p>Club: ${formData.club.replace("-"," ")}</p>
      <p>Number of Tickets: ${formData.tickets}</p>
    `;
    form.reset();
  });

  return container.outerHTML;
}

function createInput(name, labelText, type, attributes = {}) {
  const label = document.createElement("label");
  label.textContent = labelText;

  const input = document.createElement("input");
  input.name = name;
  input.type = type;
  input.required = true;

  Object.entries(attributes).forEach(([key, value]) => {
    input[key] = value;
  });

  label.appendChild(input);
  return label;
}

