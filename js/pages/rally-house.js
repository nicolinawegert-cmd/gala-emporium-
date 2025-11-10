    
    let admin = false;
    let userName = "";
    let passwordString = "";
    
    export default async function loadRallyHouse() {
        const response = await fetch("http://localhost:3000/events");
        const clubsResponse = await fetch("http://localhost:3000/clubs");
        const passwordResponse = await fetch("http://localhost:3000/passwords");
        const events = await response.json();
        const clubs = await clubsResponse.json();
        const password = await passwordResponse.json();


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
            <article>
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

        function toReturnAdmin(){
            return ` <h2>New Entry</h2>
            <form id="myForm">
            <p>Club</p>
            <input id="clubInput" type="text" />
            <p>Date</p>
            <input id="dateInput" type="text" />
            <p>Time</p>
            <input id="timeInput" type="text" />
            <p>Title</p>
            <input id="titleInput" type="text" />
            </form>
            <button id="button" type="text"> </button>`

        };

        function adminFunc(){
            if(userName == "admin" && passwordString == password.password){
                admin = true;
            }
        }   

        /*
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
        */
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
            <article>
            <h2>artists</h2>
            <h3>song title</h3>
            </article>
            <article>
            <h2>artists</h2>
            <h3>song title</h3>
            </article>
            <article>
            <h2>artists</h2>
            <h3>song title</h3>
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
           ${toReturnAdmin()}
        </div>

    </div>`;

}

    