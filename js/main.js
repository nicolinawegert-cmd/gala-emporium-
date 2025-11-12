import loadStart from './pages/start.js';
import loadBooking from './booking.js';
import loadAdmin from './admin.js';
import loadPulseRoom from './pages/the-pulse-room.js';
import loadJazzCorner from './pages/jazz-corner.js';
import loadGiggleGalaxy from './pages/giggle-galaxy.js';
import loadRallyHouse, {functions} from './pages/rally-house.js';




// Our menu: label to display in menu and 
// function to run on menu choice
const menu = {
  "start": { label: 'Start', function: loadStart },
  "the-pulse-room": { label: 'The Pulse Room', function: loadPulseRoom },
  "jazz-corner": { label: 'Jazz Corner', function: loadJazzCorner },
  "giggle-galaxy": { label: 'Giggle Galaxy', function: loadGiggleGalaxy },
  "rally-house": { label: 'Rally House', function: loadRallyHouse, eventFunc: functions},
  "booking": { label: 'Booking', function: loadBooking },
  "admin": { label: 'Admin', function: loadAdmin },
};

function createMenu() { //funktion som skapar menyn och returnerar en html sträng object.entries gör om meny till en array .map går igenom varje element i arrayen och skapar en länk för varje meny objekt.
  return Object.entries(menu)
    .map(([urlHash, { label }]) => `
      <a href="#${urlHash}">${label}</a>
    `)
    .join('');
}

async function loadPageContent() {
  if (!location.hash) {
    location.replace('#start');
    return;
  }
    
    const key = location.hash.slice(1);
    const pageFunction = menu[key].function;
    const eventFunction = menu[key].eventFunc;
   
    const html = await pageFunction();
    document.querySelector('#page-container').innerHTML = html;

    if (typeof eventFunction === 'function') {
      eventFunction();
    }
}

//call loadPageContent once on page load
document.querySelector('header nav').innerHTML = createMenu();
  loadPageContent();
  window.onhashchange = loadPageContent;

  export default function createEvent(title, date, time, clubId){
    fetch("http://localhost:3000/events", {
        method: "POST", body: JSON.stringify({
        clubId: clubId,
        date: date,
        time: time,
        title: title
        })
        })
        .then(response => response.json())
        .then(data => {
        console.log("Added new club:", data);
        })
        .catch(error => console.error("Error:", error));
                    

}

