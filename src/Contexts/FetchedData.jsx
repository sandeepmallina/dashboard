import React, { useEffect, useState, createContext, useContext } from "react";

export const StateContext = createContext();

const FetchedData = ({ children }) => {
  const [responseData, setResponsedata] = useState([]);
  const [sharedData, setSharedData] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:8888/.netlify/functions/server") // Replace with the actual backend URL
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Store the data in Local Storage
          setItem("responseData", JSON.stringify(data));
          setResponsedata(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    console.log("data is being fetched");
    // Check if there is data in Local Storage on page load
    const storedData = localStorage.getItem("responseData");
    if (storedData) {
      setResponsedata(JSON.parse(storedData));
    } else {
      fetchData(); // Fetch data if it's not in Local Storage
    }
  }, []); // Make sure to include an empty dependency array to fetch data only once

  // You can return a loading state or render your components once data is fetched
  const getIntensityVsCountry = () => {
    let countryIntensityMap = {};
    responseData
      .filter((item) => item.intensity !== null && item.country !== "")
      .forEach((item) => {
        let intensity = parseInt(item.intensity);
        if (isNaN(intensity)) {
          return;
        }
        if (countryIntensityMap[item.country]) {
          countryIntensityMap[item.country] += intensity;
        } else {
          countryIntensityMap[item.country] = intensity;
        }
      });
    return Object.entries(countryIntensityMap).map(([country, intensity]) => ({
      country,
      intensity,
    }));
  };
  const getCountOfCountries = () => {
    const uniqueCountries = [
      ...new Set(responseData.map((item) => item.country)),
    ];
    return uniqueCountries.length;
  };
  const getCountOfregions = () => {
    const uniqueRegions = [...new Set(responseData.map((item) => item.region))];
    return uniqueRegions.length;
  };
  const getAvgIntensity = () => {
    const sum = responseData.reduce((total, item) => {
      let intensity = parseInt(item.intensity);
      // Check if intensity is a number
      if (!isNaN(intensity)) {
        return total + intensity;
      } else {
        return total;
      }
    }, 0);

    // Calculate the average
    const average = sum / responseData.length;
    // console.log(average, "hello");
    return average;
  };

  const getLastTenCountriesByIntensity = (data) => {
    const filteredData = data.filter(
      (item) => item.intensity !== null && item.country !== ""
    );

    // Sort the data by intensity in descending order
    const sortedData = filteredData.sort((a, b) => b.intensity - a.intensity);

    // Get the top ten entries
    const topTen = sortedData.slice(-10);

    // Extract and return only the country and intensity
    const result = topTen.map((item) => ({
      country: item.country,
      intensity: item.intensity,
    }));

    return result;
  };
  const getTopTenCountriesByIntensity = (data) => {
    // Filter out entries with null intensity or empty country
    const filteredData = data.filter(
      (item) => item.intensity !== null && item.country !== ""
    );

    // Sort the data by intensity in descending order
    const sortedData = filteredData.sort((a, b) => b.intensity - a.intensity);

    // Get the top ten entries
    const topTen = sortedData.slice(0, 10);

    // Extract and return only the country and intensity
    const result = topTen.map((item) => ({
      country: item.country,
      intensity: item.intensity,
    }));

    return result;
  };
  const getNoofSources = () => {
    const uniqueSources = [...new Set(responseData.map((item) => item.source))];
    return uniqueSources.length;
  };
  const getYearvsIntensity = () => {
    const intensityByYear = responseData
      .filter((item) => item.end_year !== "") // Filter out items with empty end_year
      .reduce((acc, item) => {
        // Extract year from the "added" field
        const addedDate = new Date(item.added);
        const year = addedDate.getFullYear();

        // Sum the intensity by year
        acc[year] = (acc[year] || 0) + parseInt(item.intensity);

        return acc;
      }, {});

    // Convert the intensityByYear object into an array of objects
    return Object.entries(intensityByYear).map(([year, intensity]) => ({
      year: parseInt(year),
      intensity,
    }));
  };
  const getUniqueNonEmptyEndYears = () => {
    // Create a Set to store unique, non-empty end years
    const uniqueNonEmptyEndYears = new Set();

    // Iterate through the data and add unique, non-empty end years to the Set
    responseData.forEach((item) => {
      let endYear = parseInt(item.end_year);
      // console.log(typeof endYear);
      // Check if endYear is a number and not NaN before adding to the set
      if (!isNaN(endYear)) {
        uniqueNonEmptyEndYears.add(endYear);
      }
    });
    let sortedEndYears = Array.from(uniqueNonEmptyEndYears).sort(
      (a, b) => a - b
    );

    // Now uniqueNonEmptyEndYears contains the unique, non-empty end years
    return sortedEndYears; // Convert Set to an array if needed
  };

  const calculateSectorLikelihood = () => {
    const sectorLikelihoods = {};

    responseData
      .filter((item) => item.region && item.sector)
      .forEach((item) => {
        const sector = item.sector;
        const likelihood = parseInt(item.likelihood);

        sectorLikelihoods[sector] =
          (sectorLikelihoods[sector] || 0) + likelihood;
      });

    const sectorLikelihoodArray = Object.keys(sectorLikelihoods).map(
      (sector) => ({
        sector,
        likelihood: sectorLikelihoods[sector],
      })
    );

    // Add the initial empty object to the beginning of the array

    return sectorLikelihoodArray;
  };

  // const sectorLikelihoodArray = calculateSectorLikelihood();

  // console.log(sectorLikelihoodArray, "sectorLikelihoodArray");

  const calculateSectorAndRegionLikelihood = () => {
    const sectorRegionLikelihoods = {};

    responseData
      .filter((item) => item.region && item.sector)
      .forEach((item) => {
        const sector = item.sector;
        const region = item.region;
        const likelihood = parseInt(item.likelihood);

        const key = `${sector} - ${region}`;
        sectorRegionLikelihoods[key] =
          (sectorRegionLikelihoods[key] || 0) + likelihood;
      });

    return Object.entries(sectorRegionLikelihoods).map(([key, likelihood]) => {
      const [sector, region] = key.split(" - ");
      return {
        sector,
        region,
        likelihood,
      };
    });
  };
  // const sectorAndRegionLikelihoodArray =
  //   calculateSectorAndRegionLikelihood(responseData);

  // console.log(sectorAndRegionLikelihoodArray);

  return (
    <StateContext.Provider
      value={{
        responseData,
        getIntensityVsCountry,
        getCountOfCountries,
        getCountOfregions,
        getAvgIntensity,
        getLastTenCountriesByIntensity,
        getTopTenCountriesByIntensity,
        getYearvsIntensity,
        getUniqueNonEmptyEndYears,
        calculateSectorLikelihood,
        calculateSectorAndRegionLikelihood,
        sharedData,
        setSharedData,
        getNoofSources,
      }}
    >
      {/* Your components can be rendered here */}
      {children}
    </StateContext.Provider>
  );
};

export default FetchedData;
