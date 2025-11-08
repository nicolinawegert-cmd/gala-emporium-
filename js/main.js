import loadStart from './pages/start.js';
import loadPulseRoom from './pages/the-pulse-room.js';
import loadJazzCorner from './pages/jazz-corner.js';
import loadGiggleGalaxy from './pages/giggle-galaxy.js';
import loadRallyHouse from './pages/rally-house.js';


// Our menu: label to display in menu and 
// function to run on menu choice
const menu = {
  "start": { label: 'Start', function: loadStart },
  "jazz-corner": { label: 'Jazz-corner', function: loadJazzCorner },
  "giggle-galaxy": { label: 'Giggle-galaxy', function: loadGiggleGalaxy },
  "rally-house": { label: 'Rally-house', function: loadRallyHouse },
  "the-pulse-room": { label: 'The-pulse-room', function: loadPulseRoom },
};

function createMenu() {
  // Object.entries -> convert object to array
  // then map to create a-tags (links)
  // then join everything into one big string
  return Object.entries(menu)
    .map(([urlHash, { label }]) => `
      <a href="#${urlHash}">${label}</a>
    `)
    .join('');
}

async function loadPageContent() {
  // if no hash redirect to #start
  if (location.hash === '') { location.replace('#start'); }
  // add a class on body so that we can style differnt pages differently
  document.body.setAttribute('class', location.hash.slice(1));
  // get the correct function to run depending on location.hash
  const functionToRun = menu[location.hash.slice(1)].function;
  // run the function and expect it return a html string
  const html = await functionToRun();
  // replace the contents of the main element
  document.querySelector('main').innerHTML = html;
}

// call loadPageContent once on page load
loadPageContent();

// and then on every hash change of the url/location
window.onhashchange = loadPageContent;

// create the menu and display it
document.querySelector('header nav').innerHTML = createMenu();