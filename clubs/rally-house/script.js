    document.addEventListener("DOMContentLoaded", () => {
        load();
    });
    
    async function load() {
        const response = await fetch("http://localhost:3000/events");
        const clubsResponse = await fetch("http://localhost:3000/clubs");
        const events = await response.json();
        const clubs = await clubsResponse.json();
        let admin = false;
        let userName = "";
        let password = "";


        function toReturnExplanation()
        {
            html = "";

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
        }

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
            
        }

        document.querySelector("#explanation").innerHTML = toReturnExplanation();
        document.querySelector("#events").innerHTML = toReturnEvents();
        if(admin)
        {
            document.querySelector("#adminOnly").innerHTML = toReturnAdmin();
        }
        else
        {
            document.querySelector("#adminOnly").innerHTML = "";
        }

        function adminFunc(){
            if(userName == "admin" && password == "Hqqp123!"){
                admin = true;
            }
        }   

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
                password = event.target.value;
                adminFunc();
            }
        
        });
}

    