import loadStart from './pages/start.js';
import loadBooking from './booking.js';
import loadPulseRoom from './pages/the-pulse-room.js';
import loadJazzCorner from './pages/jazz-corner.js';
import loadGiggleGalaxy from './pages/giggle-galaxy.js';
import loadRallyHouse from './pages/rally-house.js';
import loadAdmin from './admin.js';
//import loadRallyHouse from './pages/rally-house.js'; // importerar alla sidor och returnerar HTML innehåll

import clubInfoAndEvents from './utils/club-info-and-events.js'; //importer funktionen clubInfoAndEvents

// Our menu: label to display in menu and 
// function to run on menu choice
const menu = {
  "start": { label: 'Start', function: loadStart },
  "jazz-corner": { label: 'Jazz-corner', function: loadJazzCorner },
  "giggle-galaxy": { label: 'Giggle-galaxy', function: loadGiggleGalaxy },
  //"rally-house": { label: 'Rally-house', function: loadRallyHouse },
  "the-pulse-room": { label: 'The-pulse-room', function: loadPulseRoom },
  "booking": { label: 'Booking', function: loadBooking },
  "admin": {label: 'Admin', function: loadAdmin },
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
}
    
    const key = location.hash.slice(1);
    const pageFunction = menu[key].function;
   
    const html = await pageFunction();
    document.querySelector('main').innerHTML = html;
}
 //call loadPageContent once on page load
   document.querySelector('header nav').innerHTML = createMenu();
  loadPageContent();
  window.onhashchange = loadPageContent;



 
 
 
 /*   // add a class on body so that we can style differnt pages differently
  document.body.setAttribute('class', location.hash.slice(1));
  // get the correct function to run depending on location.hash
  const functionToRun = menu[location.hash.slice(1)].function;
  // run the function and expect it return a html string
  const html = await functionToRun();
  // replace the contents of the main element
  document.querySelector('main').innerHTML = html;
}

// and then on every hash change of the url/location
window.onhashchange = loadPageContent;

// create the menu and display it
document.querySelector('header nav').innerHTML = createMenu();*/
// add a class on body so that we can style differnt pages differently