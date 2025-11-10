    
    let admin = false;
    let userName = "";
    let passwordString = "";
    
    export default async function loadRallyHouse() {
        const response = await fetch("http://localhost:3000/events");
        const clubsResponse = await fetch("http://localhost:3000/clubs");
        const events = await response.json();
        const clubs = await clubsResponse.json();


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
            <form id="myForm">
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

        function createEvent(title, date, time, clubId){
            fetch("http://localhost:3000/events", {
                method: "POST",   body: JSON.stringify({
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
}
        


    