import { useState } from "react";

import "./App.css";
import FetchedData from "./Contexts/FetchedData";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BarchartWrapper from "./Components/charts/BarchartWrapper";
import LinechartWrapper from "./Components/charts/LinechartWrapper";
import ScattercartWrapper from "./Components/charts/ScatterPlot/ScattercartWrapper";
import Report from "./Components/Analysis/Report";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <BrowserRouter>
        <div className="grid-container">
          <Header OpenSidebar={OpenSidebar} />
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />

          <FetchedData>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Home />} />
              <Route
                path="/barchart"
                element={<BarchartWrapper width={600} height={600} />}
              />
              <Route
                path="/linechart"
                element={<LinechartWrapper width={500} height={500} />}
              />
              <Route
                path="/scatterplot"
                element={<ScattercartWrapper width={550} height={550} />}
              />
              <Route path="/Reports" element={<Report />} />
            </Routes>
          </FetchedData>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
