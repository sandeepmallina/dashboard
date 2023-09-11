import React, { useContext, useState } from "react";
import { Scatterplot } from "./Scatterplot";
import { StateContext } from "../../../Contexts/FetchedData";
import Select from "react-select";

function ScattercartWrapper({ width, height }) {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "lightblue",
      width: 150,
      outline: "none",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "lightgreen" : "white",
      width: 150,
    }),
    menu: (provided) => ({
      ...provided,
      width: 150, // Width of the entire dropdown menu
    }),
  };
  const { responseData } = useContext(StateContext);

  const [scatterData, setScatterData] = useState([]);
  const [selectedPestle, setSelectedPestle] = useState(" ");
  let pestleOptions = [...new Set(responseData.map((item) => item.pestle))]
    .filter((item) => item != "")
    .map((item) => ({
      value: item,
      label: item,
    }));
  let newElement = { value: "All", label: "All" };

  pestleOptions.unshift(newElement);
  const groupedData = responseData
    .filter(
      (item) =>
        item.pestle &&
        item.topic &&
        item.likelihood !== undefined &&
        item.relevance !== undefined
    )
    .reduce((groups, item) => {
      const key = `${item.pestle}-${item.topic}`;
      if (!groups[key]) {
        groups[key] = {
          pestle: item.pestle,
          topic: item.topic,
          likelihood: item.likelihood,
          relevance: item.relevance,
        };
      } else {
        groups[key].likelihood += item.likelihood;
        groups[key].relevance += item.relevance;
      }
      return groups;
    }, {});

  const combinedData = Object.values(groupedData);

  const handlepestleChange = (selectedOption) => {
    setSelectedPestle(selectedOption);
    if (selectedOption) {
      const pestle = selectedOption.value;
      const filteredData =
        pestle != "All"
          ? combinedData.filter((item) => item.pestle === pestle)
          : combinedData;
      setScatterData(filteredData);
    } else {
      setScatterData(combinedData);
    }
  };
  return (
    <div className="chart-area ">
      {/* {console.log(options, "hi")} */}
      <h1 className="chart-title">Likelihood-Relevance Analysis</h1>
      <div className="chart-conatainer">
        <Select
          isSearchable={false}
          styles={customStyles}
          options={pestleOptions}
          onChange={handlepestleChange}
        />
        <Scatterplot
          data={selectedPestle == " " ? combinedData : scatterData}
          width={width}
          height={height}
        />
      </div>
    </div>
  );
}

export default ScattercartWrapper;
