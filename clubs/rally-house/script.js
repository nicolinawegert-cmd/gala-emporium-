    async function load() {
        const response = await fetch("http://localhost:3000/events");
        const clubsResponse = await fetch("http://localhost:3000/clubs");
        const events = await response.json();
        const clubs = await clubsResponse.json();


        function toReturnExplanation()
        {
            html = "";

            html = clubs.map(({name, description}) => { if(name == "Rally House") { return `
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

            html = events.map(({club, time, date, title}) => { if(club == "Rally House") { return `
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

        document.querySelector("#explanation").innerHTML = toReturnExplanation();
        document.querySelector("#events").innerHTML = toReturnEvents();
    }

    load();
    