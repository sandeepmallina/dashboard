import React, { useContext, useEffect, useState } from "react";
import { BsArrowUp, BsArrowDown, BsFillBellFill } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { FaMapMarked } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import Select from "react-select";
import { StateContext } from "../Contexs/FetchedData";
import { Barchart } from "./charts/Barchart";
import { Linechart } from "./charts/Linechart";
import Piechart from "./charts/Piechart";
import { Scatterplot } from "./charts/ScatterPlot/Scatterplot";

function Home() {
  const {
    getCountOfCountries,
    getCountOfregions,
    getAvgIntensity,
    getIntensityVsCountry,
    getLastTenCountriesByIntensity,
    getTopTenCountriesByIntensity,
    getUniqueNonEmptyEndYears,
    getYearvsIntensity,
    calculateSectorLikelihood,
    calculateSectorAndRegionLikelihood,
    responseData,
  } = useContext(StateContext);
  const [count, setCount] = useState(0);
  const [regcount, setRegcount] = useState(0);
  const [avgIntensity, setAvgIntensity] = useState(0);
  const [selectGroup, setSelectedGroup] = useState("Top10");
  const [filteredData, setFilteredData] = useState([]);
  const [lineselectGroup, setLineSelectedGroup] = useState(" ");
  const [unfiltredData, setUnfiltredData] = useState([]);
  const [data, setData] = useState([]);
  const [piedata, setPiedata] = useState([]);
  const [regionData, setRegionData] = useState([]);
  const [filteredPieData, setFiltredPieData] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(" ");

  useEffect(() => {
    const fetchDataAndSetCount = async () => {
      const CountryCount = getCountOfCountries();
      setCount(CountryCount);
      const RegionCount = getCountOfregions();
      setRegcount(RegionCount);
      const AvgIntensity = getAvgIntensity();
      setAvgIntensity(AvgIntensity);
      const Data = getIntensityVsCountry();
      setData(Data);
      const LineData = getYearvsIntensity();
      setUnfiltredData(LineData);
      const PieChartData = calculateSectorLikelihood();
      setPiedata(PieChartData);
      const RegionData = calculateSectorAndRegionLikelihood();
      setRegionData(RegionData);
    };

    fetchDataAndSetCount();
  }, [getCountOfCountries]);
  // {
  //   console.log(regionData, "piedata");
  // }
  const regionOptions = [...new Set(regionData.map((item) => item.region))]
    .map((item) => ({
      value: item,
      label: item,
    }))
    .filter((item) => item.value !== "world");
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
  const Lineoptions = getUniqueNonEmptyEndYears().map((year) => ({
    value: year,
    label: year,
  }));
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
  // useEffect(() => {
  //   console.log(count, "hi");
  // }, [count]);
  useEffect(() => {
    // Filter the data based on the selected end year
    if (lineselectGroup) {
      const filtered = unfiltredData.filter((dataPoint) => {
        return dataPoint.year <= parseInt(lineselectGroup);
      });
      // console.log(filtered, "filtered");
      setFilteredData(filtered);
    } else {
      // If no end year is selected, use the entire dataset
      setFilteredData(unfiltredData);
    }
  }, [lineselectGroup]);
  const handleRegionChange = (selectedOption) => {
    setSelectedRegion(selectedOption);

    if (selectedOption) {
      const region = selectedOption.value;
      const filteredData = regionData.filter((item) => item.region === region);
      setFiltredPieData(filteredData);
    } else {
      setFiltredPieData(piedata);
    }
  };
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
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>COUNTRIES</h3>
            <MdLocationPin className="card_icon" />
          </div>
          <h1>{count}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>REGIONS</h3>
            <FaMapMarked className="card_icon" />
          </div>
          <h1>{regcount}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>AVG INTENSITY</h3>
            <TbReportSearch className="card_icon" />
          </div>
          <h1>{avgIntensity}</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>

      <div className="charts">
        <div className="bar-chart-container">
          <h3 className="chart-title">Country-wise Intensity Analysis</h3>
          <Select
            isSearchable={false}
            styles={customStyles}
            options={options}
            onChange={(selectedOption) =>
              setSelectedGroup(selectedOption.value)
            }
          />
          <Barchart
            width={500}
            height={400}
            data={
              selectGroup === "Top10"
                ? getTopTenCountriesByIntensity(data)
                : getLastTenCountriesByIntensity(data)
            }
          />
        </div>

        <div className="line-chart-container">
          <h3 className="chart-title">Year-wise Intensity Analysis</h3>
          <Select
            isSearchable={false}
            styles={customStyles}
            options={Lineoptions}
            onChange={(selectedOption) =>
              setLineSelectedGroup(selectedOption.value)
            }
          />

          {lineselectGroup === "2016" ? (
            <h3>No data for 2016 </h3>
          ) : (
            <Linechart
              width={500}
              height={400}
              data={lineselectGroup === " " ? unfiltredData : filteredData}
            />
          )}
        </div>
        <div className="pie-chart-container">
          <h3 className="chart-title">Sector-wise Likilihood Analysis</h3>
          <Select
            isSearchable={false}
            styles={customStyles}
            options={regionOptions}
            onChange={handleRegionChange}
          />
          <Piechart
            className="pie-chart"
            width={600}
            height={500}
            data={selectedRegion === " " ? piedata : filteredPieData}
          />
        </div>
        <div className="pie-chart-container">
          <h3 className="chart-title">Likelihood-Relevance Analysis</h3>
          <Select
            isSearchable={false}
            styles={customStyles}
            options={pestleOptions}
            onChange={handlepestleChange}
          />
          <Scatterplot
            data={selectedPestle == " " ? combinedData : scatterData}
            width={500}
            height={500}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
