const API_KEY = "";
const BASE_URL = "https://api.nasa.gov";

export const getAPOD = async () => {
  const res = await fetch(`${BASE_URL}/planetary/apod?api_key=${API_KEY}`);
  return res.json();
};

export const getMarsPhotos = async (rover = "curiosity") => {
  const res = await fetch(
    `${BASE_URL}/mars-photos/api/v1/rovers/${rover}/photos?sol=1000&api_key=${API_KEY}`
  );
  return res.json();
};
