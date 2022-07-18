import CountryCard from '../CountryCard';

export default function CountryJSX({ randomizedCountry }) {
   return (
     <CountryCard
     flag={randomizedCountry.flag} 
     name={randomizedCountry.name.common} 
     population={randomizedCountry.population}
     continents={randomizedCountry.continents}
     seal={randomizedCountry.coatOfArms}
    />
  );
};