import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../Contexs/FetchedData";
import { Barchart } from "./Barchart";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import Select from "react-select";

function BarchartWrapper() {
  const {
    getIntensityVsCountry,
    getLastTenCountriesByIntensity,
    getTopTenCountriesByIntensity,
  } = useContext(StateContext);
  const [data, setData] = useState([]);
  const options = [
    {
      value: "Top10",
      label: (
        <div>
          <BsArrowUp className="icon" />
          Sort
        </div>
      ),
    },
    {
      value: "Bottom10",
      label: (
        <div>
          <BsArrowDown className="icon" />
          Sort
        </div>
      ),
    },
  ];
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
  useEffect(() => {
    const fetchDataAndSetCount = async () => {
      const Data = getIntensityVsCountry();
      setData(Data);
    };

    fetchDataAndSetCount();
  }, [getIntensityVsCountry]);
  const [selectGroup, setSelectedGroup] = useState("Top10");

  return (
    <div className="chart-area ">
      {/* {console.log(getTopTen(), "hi")} */}
      <h1 className="chart-title">Country-wise Intensity Analysis</h1>
      <div className="chart-conatainer">
        <Select
          isSearchable={false}
          styles={customStyles}
          options={options}
          onChange={(selectedOption) => setSelectedGroup(selectedOption.value)}
        />
        <Barchart
          width={600}
          height={600}
          data={
            selectGroup === "Top10"
              ? getTopTenCountriesByIntensity(data)
              : getLastTenCountriesByIntensity(data)
          }
        />
      </div>
    </div>
  );
}

export default BarchartWrapper;
