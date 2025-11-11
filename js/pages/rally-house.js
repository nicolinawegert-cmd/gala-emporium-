    
    let admin = false;
    let userName = "";
    let passwordString = "";
    import createEvent from '../main.js';
    
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

        function toReturnEvents(){
            let html = ""; 

            html = events.map(({clubId, time, date, title}) => { if(clubId == "hh72") { return `
            <article class="rally-house">
            <h2>${title}</h2>
            <h3>${date}</h3>
            <h4>${time}</h4>
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

    <div id="main">
        <h1>The Rally House</h1>
        <div id="explanation">
            <h3>
                ${toReturnExplanation()}
            </h3>
        </div>
        <div id="songs">
            <article class="rally-house starterSongs">
            <h2>PXRKX</h2>
            <h3>Marlboro Club</h3>
            <span class="material-symbols-outlined">
            play_circle
            </span>
            </article>
            <article class="rally-house starterSongs">
            <h2>prod. DTM</h2>
            <h3>Rally House</h3>
            <span class="material-symbols-outlined">
            play_circle
            </span>
            </article>
            <article class="rally-house starterSongs">
            <h2>-prey, staplegun</h2>
            <h3>Bring it!</h3>
            <span class="material-symbols-outlined">
            play_circle
            </span>
            </article>
        </div>

        <div id="events">
            ${toReturnEvents()}
        </div>

        <div id="booking">
            
        </div>

        <div id="createEvent">
            
        </div>

        <div id="adminOnly">

        </div>

    </div>`;

}

export async function functions(){

        const passwordResponse = await fetch("http://localhost:3000/passwords");
        const password = await passwordResponse.json();

        document.getElementById("firstInput").addEventListener("keydown", (event) => {
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

}
        


    