import clubInfoAndEvents from "../../clubInfoAndEvents.js";

export default async function jazzCorner() {
    return clubInfoAndEvents ('jazz-corner');
}
const events = [
    { title: "Miles Davis Tribute", date: "2024-07-10", time: "20:00", price: 200, description: "An evening dedicated to the legendary Miles Davis." },
    { title: "Ella Fitzgerald Night", date: "2024-07-17", time: "20:00", price: 200, description: "Celebrate the First Lady of Song with classic hits." },
    { title: "John Coltrane Celebration", date: "2024-07-24", time: "20:00", price: 300, description: "A night of improvisation and genius." }
];
const eventList = document.getElementById('event-list');

events.forEach(gig => {
    const card = document.createElement('div');
    card.classList.add('event-card');
    card.innerHTML = `
        <h2>${gig.title}</h2>
        <p>${gig.date}</p>
        <p>${gig.price} kr</p>
        <p>${gig.description}</p>
        <button>Book Now</button>
    `;
    eventList.appendChild(card);
});