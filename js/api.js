const API_URL = "https://localhost:3000";

export async function getClub(clubId) {
  const res = await fetch(`${API_URL}/clubs/${clubId}`);
  return res.json();
}

export async function getEvents(clubId) {
  const res = await fetch(`${API_URL}/events?clubId=${clubId}`);
  return res.json();
}
