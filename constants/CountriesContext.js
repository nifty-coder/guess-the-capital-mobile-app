import { createContext, useEffect, useState } from "react";

export const CountriesContext = createContext();
export const CountriesContextProvider = (props) => {
    const [countriesList, setCountriesList] = useState([]);
    
    useEffect(() => {
      (async () => {
        const response = await fetch('https://restcountries.com/v3.1/all', {
            method: 'GET',
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }).then((res) => res.json()).catch(err => new Error("Something went wrong. " + err));

          if(!response) {
            throw new Error("No countries!");
          } else {
            setCountriesList(response);
          }
        })();
    }, []);

    const deleteFromCountriesList = (countryToRemove) => {
        countriesList.filter(item => console.log(item[countryToRemove]));
        // const updatedList = countriesList.filter(item => item.name !== );
        // setCountriesList(updatedList);
    };

    return (
      <CountriesContext.Provider 
      value={
        { 
          response: countriesList, 
          deleteCountry: deleteFromCountriesList 
        }
      }>
        {props.children}
      </CountriesContext.Provider>
    );
};