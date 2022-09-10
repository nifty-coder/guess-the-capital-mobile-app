const API_INITIAL_LINK = 'https://restcountries.com/v3.1';

const Asia = "Asia";
const NorthAmerica = "North America";
const SouthAmerica = "South America";
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
    case SouthAmerica:
      mapLink = 'https://ontheworldmap.com/south-america/south-america-map-1000.jpg';
    case Europe:
      mapLink = 'https://w7.pngwing.com/pngs/208/635/png-transparent-map-europe-continent-countries-european-countries-chart-map-of-europe-european-map-digital-drawing-educational.png';
    break;
    case Africa:
      mapLink = 'https://i.ibb.co/cwf0NT5/africa-countries.png';
    break;
    case Oceania:
      mapLink = 'https://i.pinimg.com/550x/b6/b8/6d/b6b86d8753133c0de795b8770a3c94eb.jpg';
    break;
    case Antarctica:
      mapLink = "https://i.pinimg.com/600x315/97/d4/a7/97d4a78e17bf53fc3c9d6c18f5d3eb13.jpg";
  };

  return mapLink;
};

export async function fetchCountriesAndReturnRandomCountries() {
  const response = await fetch(API_INITIAL_LINK + '/all', {
    method: 'GET',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  }).then((res) => res.json()); 

  if(!response) {
    throw new Error("Something went wrong.");
  } 
  
  const setOfCountries = new Set();
  while(setOfCountries.size < 4) {
    let randomIndex = Math.floor(Math.random() * response.length + 1);
    if(
      ("capital" in response[randomIndex]) === false 
      || response[randomIndex].population === 0 
      || response[randomIndex].continents[0] === Antarctica
    ) {
      continue;
    }
    setOfCountries.add(response[randomIndex]);
  }

  const arrayOfCountries = Array.from(setOfCountries); 
  return arrayOfCountries;
};

function shuffle(array = []) {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
   [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};
export async function fetchAnswers(countryList) {
  const correctAnswer = countryList[0].capital.map((cap) => cap).join(", ");
  const firstAnswer = countryList[1].capital.map((cap) => cap).join(", ");
  const secondAnswer = countryList[2].capital.map((cap) => cap).join(", ");
  const thirdAnswer = countryList[3].capital.map((cap) => cap).join(", ");
  const answersArray = [correctAnswer, firstAnswer, secondAnswer, thirdAnswer];
  return shuffle(answersArray);
};