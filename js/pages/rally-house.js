    
    let admin = false;
    let userName = "";
    let passwordString = "";
    import createEvent from '../main.js';
    import { attachBookEventHandlers } from "../bookEventHandler.js";
    
    export default async function loadRallyHouse() {
        const response = await fetch("http://localhost:3000/events");
        const clubsResponse = await fetch("http://localhost:3000/clubs");
        const events = await response.json();
        const clubs = await clubsResponse.json();
        
        document.body.className = "rally-house";

    function toReturnExplanation()
        {
            let html = "";

            html = clubs.map(({id, description}) => { if(id == "hh72") { return `
            <h3>${description}</h3>
            `
            
        }
        else
        {
            return "";
        }
        }).join("");
        return html;
        };

    function toReturnSongs(){
        let html = "";
        let artists = ["PXRKX", "prod. DTM", "prey, staplegun"];
        let songNames = ["Marlboro Club", "Rally House", "Bring it!"];
        let songs = ["MARLBORO CLUB 4.mp3", "RALLY HOUSE 4.mp3", "Bring it!.mp3"];

        for(let i = 0; i < 3; i++){
            html += `
            <article class="rally-house starterSongs" data-src="assets/songs/${songs[i]}">
            <h2>${artists[i]}</h2>
            <h3>${songNames[i]}</h3>
            <span class="material-symbols-outlined">
            play_circle
            </span>
            </article>
            `;
        }

        return html;
    }

    function toReturnEvents(){
            let html = ""; 

            html = events.map(({clubId, time, date, title}) => { if(clubId == "hh72") { return `
            <article class="rally-house">
            <h2>${title}</h2>
            <h3>${date}</h3>
            <h4>${time}</h4>
            <button 
                class="book-event-btn" 
                data-club="${clubId}" 
                data-id="hh72"
                data-title="${title}">
                Book Event
            </button>
            </article>
            `
            
        }
        else
        {
            return "";
        }
        }).join("");
            return html;
        };

return `    <form id="myForm">
        <p>Username</p>
        <input id="firstInput" type="text" />
        <p>password</p>
        <input id="secondInput" type="text" />
    </form>

    <div id="new">
        <h1>The Rally House</h1>
        <div id="explanation">
            <h3>
                ${toReturnExplanation()}
            </h3>
        </div>
        <div id="songs">
            ${toReturnSongs()}
        </div>

        <div id="events">
            ${toReturnEvents()}
        </div>

        <div id="rallyBooking">

        </div>

        <div id="adminOnly">

        </div>

        <p class="pulse-footer-copy">© 2025 Rally House</p>

    </div>`;

}

export async function functions(){

        const passwordResponse = await fetch("http://localhost:3000/passwords");
        const password = await passwordResponse.json();

        document.getElementById("rallyBooking").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                userName = event.target.value;
                adminFunc();
            }
        
        });

        document.getElementById("secondInput").addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                passwordString = event.target.value;
                adminFunc();
            }
        
        });

        let audioPlaying = null;

        document.querySelectorAll(".material-symbols-outlined").forEach((icon) => {
        // find the closest parent with the data-src attribute
        const songSrc = icon.closest("[data-src]")?.dataset.src;
        if (!songSrc) return;

        const audio = new Audio(songSrc);

        icon.addEventListener("click", () => {
            // pause currently playing song if another starts
            if (audioPlaying && audioPlaying !== audio) {
            audioPlaying.pause();
            }

            // toggle play/pause
            if (audio.paused) {
            audio.play();
            icon.textContent = "pause_circle";
            audioPlaying = audio;
            console.log("Playing:", songSrc);
            } else {
            audio.pause();
            icon.textContent = "play_circle";
            console.log("Paused:", songSrc);
            }
        });
        });

        function toReturnAdmin(){
            console.log("DOM test");
            return `
            <form id="eventForm">
            <p>Date</p>
            <input id="dateInput" type="text" />
            <p>Time</p>
            <input id="timeInput" type="text" />
            <p>Title</p>
            <input id="titleInput" type="text" />
            </form>
            <button id="button" type="button">Submit</button>`
        };

        function adminFunc(){
            if(userName == "admin" && passwordString == password[0].password){
                admin = true;

                document.getElementById("adminOnly").innerHTML = toReturnAdmin();

                document.getElementById("button").addEventListener("click", () => {
                    const date = document.getElementById("dateInput").value;
                    const time = document.getElementById("timeInput").value;
                    const title = document.getElementById("titleInput").value;

                    createEvent(title, date, time, "hh72");
                });
            }
        }

        setTimeout(() => attachBookEventHandlers(), 0);

}
        


    