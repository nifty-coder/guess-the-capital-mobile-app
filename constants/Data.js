export async function fetchCountriesAndReturnRandomCountry() {
  const response = await fetch('https://restcountries.com/v3.1/all', {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then((res) => res.json()); 

  if(!response) {
    throw new Error("Couldn't select a random country. Try again!");
  } 

  return response[Math.floor(Math.random() * response.length)];
};

const Asia = "Asia";
const NorthAmerica = "North America";
const Europe = "Europe";
const Africa = "Africa";
const Oceania = "Oceania";
const Antarctica = "Antarctica";

export function getContinentMap(continent) {
  let mapLink;

  switch(continent) {
    case Asia:
      mapLink = 'https://www.conceptdraw.com/How-To-Guide/picture/Geo-Map-of-Asia.png';
    break;
    case NorthAmerica:
      mapLink = 'https://i.pinimg.com/originals/25/6f/e1/256fe1d0ad74be4cfac2526fe6e8156d.png';
    break;
    case Europe:
      mapLink = 'https://w7.pngwing.com/pngs/208/635/png-transparent-map-europe-continent-countries-european-countries-chart-map-of-europe-european-map-digital-drawing-educational.png';
    break;
    case Africa:
      mapLink = 'https://www.freeworldmaps.net/printable/africa/africa_countries.jpg';
    case Oceania:
      mapLink = 'https://i.pinimg.com/550x/b6/b8/6d/b6b86d8753133c0de795b8770a3c94eb.jpg';
    case Antarctica:
      mapLink = "https://i.pinimg.com/600x315/97/d4/a7/97d4a78e17bf53fc3c9d6c18f5d3eb13.jpg";
    default:
      mapLink = null;
  };

  return mapLink;
};