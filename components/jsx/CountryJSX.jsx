import CountryCard from '../CountryCard';

export default function CountryJSX({ player, wonGame, capital, randomizedCountry }) {
   return (
     <CountryCard
     player={player}
     wonGame={wonGame}
     capital={capital}
     flag={randomizedCountry.flag} 
     name={randomizedCountry.name.common} 
     population={randomizedCountry.population}
     continents={randomizedCountry.continents}
     seal={randomizedCountry.coatOfArms}
    />
  );
};