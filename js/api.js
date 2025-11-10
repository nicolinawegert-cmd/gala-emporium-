const API_URL = "http://localhost:3000";

export async function getClub(clubId) {
  const res = await fetch(`${API_URL}/clubs/${clubId}`);
  return res.json();
}

export async function getEvents(clubId) {
const url = clubId ? `${API_URL}/events?clubId=${clubId}` : `${API_URL}/events`;
const res = await fetch(url);
return res.json();
}
