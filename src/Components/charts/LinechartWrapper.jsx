import React, { useContext, useEffect, useState } from "react";
import { StateContext } from "../../Contexs/FetchedData";
import { Linechart } from "./Linechart";
import Select from "react-select";
const LinechartWrapper = () => {
  const { getYearvsIntensity, getUniqueNonEmptyEndYears } =
    useContext(StateContext);
  const [selectGroup, setSelectedGroup] = useState(" ");
  const [filteredData, setFilteredData] = useState([]);
  const [unfiltredData, setUnfiltredData] = useState([]);
  const options = getUniqueNonEmptyEndYears().map((year) => ({
    value: year,
    label: year,
  }));
  {
    console.log(getYearvsIntensity());
  }
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "lightblue",
      width: 120,
      outline: "none",
      boxShadow: "none",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "lightgreen" : "white",
      width: 120,
    }),
    menu: (provided) => ({
      ...provided,
      width: 120, // Width of the entire dropdown menu
    }),
  };
  useEffect(() => {
    const fetchDataAndSetCount = async () => {
      const Data = getYearvsIntensity();
      console.log(Data, "hi");
      setUnfiltredData(Data);
    };

    fetchDataAndSetCount();
  }, [getYearvsIntensity]);
  useEffect(() => {
    // Filter the data based on the selected end year
    if (selectGroup) {
      const filtered = unfiltredData.filter((dataPoint) => {
        return dataPoint.year <= parseInt(selectGroup);
      });
      // console.log(filtered, "filtered");
      setFilteredData(filtered);
    } else {
      // If no end year is selected, use the entire dataset
      setFilteredData(unfiltredData);
    }
  }, [selectGroup]);
  return (
    <div className="chart-area ">
      {/* {console.log(options, "hi")} */}

      <h1 className="chart-title">Year-wise Intensity Analysis</h1>
      <div className="chart-conatainer">
        <h3>End Year :-</h3>
        <Select
          isSearchable={false}
          styles={customStyles}
          options={options}
          onChange={(selectedOption) => setSelectedGroup(selectedOption.value)}
        />
        {selectGroup === 2016 ? (
          <h3 className="warning-text">No data for 2016 </h3>
        ) : (
          <Linechart
            width={600}
            height={600}
            data={selectGroup === " " ? unfiltredData : filteredData}
          />
        )}
      </div>
    </div>
  );
};

export default LinechartWrapper;
