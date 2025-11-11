import { getEvents } from "../api.js"; // hämtar en funfion getEvents från api.js

export default async function loadStart() { //skapar funktionen LoadStart
  const events = await getEvents(); //hämtar alla events från getEvents funktionen och sparar dem i variabeln events
 
  const upcoming = events 
  .sort ((a, b) => new Date(a.date) - new Date(b.date)) //sorterar events efter datum i stigande ordning
  .slice(0, 6); //tar de 6 första eventsen från den sorterade listan
     document.body.className = "start-page"; //sätter body klassnamn till start-page
    return `
    <section class="hero-antique">
        <div class="hero-overlay"></div>
        <h1 class="hero-title">Gala Emporium</h1>
        <p class="hero-subtitle">Where Elegance Meets Performance</p>
    </section>

    <section class="grand-events">
        <h2 class="section-title">Kommande Framträdanden</h2>

        <div class="event-posters">
            ${upcoming.map(ev => `
                <article class="event-poster">
                    <h3>${ev.title}</h3>
                    <p class="event-date">${ev.date} • ${ev.time ?? ""}</p>
                    <a href="#${ev.clubId}" class="event-link">Till klubb →</a>
                </article>
            `).join("")}
        </div>
    </section>
`;
            }
