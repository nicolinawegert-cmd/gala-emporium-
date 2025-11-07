    async function load() {
        const response = await fetch("http://localhost:3000/events");
        const events = await response.json();

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


        document.querySelector("#events").innerHTML = toReturnEvents();
    }

    load();
    