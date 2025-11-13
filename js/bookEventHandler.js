export function attachBookEventHandlers() {
  
  setTimeout(() => {
    const buttons = document.querySelectorAll(".book-event-btn");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const club = btn.dataset.club;
        const eventId = btn.dataset.id;

        if (club) localStorage.setItem("preselectClub", club);
        if (eventId) localStorage.setItem("preselectEvent", eventId);

        window.location.hash = "#booking";
      });
    });
  }, 0);
}
