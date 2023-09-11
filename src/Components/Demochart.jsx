import React, { useContext } from "react";
import { StateContext } from "../Contexs/FetchedData";

function Demochart() {
  const { responseData, getIntensityVsCountry } = useContext(StateContext); // Access the data from the context

  // Check if responseData is an array before using map
  if (!Array.isArray(responseData)) {
    return (
      <div>
        <h1>Data from Context:</h1>
        <p>No data available</p>
      </div>
    );
  }

  return <div className="chart-area">hi</div>;
}

export default Demochart;
