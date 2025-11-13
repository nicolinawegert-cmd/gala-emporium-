export function attachBookEventHandlers() {
  setTimeout(() => {
    document.querySelectorAll(".book-event-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        localStorage.setItem("preselectClub", btn.dataset.club);
        localStorage.setItem("preselectEvent", btn.dataset.id);
        window.location.hash = "#booking";
      });
    });
  }, 0);
}

