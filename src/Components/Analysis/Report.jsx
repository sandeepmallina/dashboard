import React from "react";
import { BsFileBarGraphFill, BsGraphUp } from "react-icons/bs";
import { VscGraphScatter } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Report = () => {
  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  };
  const graphdata = [
    {
      id: 1,
      link: "/barchart",
      title: "Country-wise Intensity Analysis",
      description: `The 'Country-wise Intensity Analysis' graph represents the intensity
of various factors across different countries. The USA shows the
      highest intensity, indicating a significant impact or relevance in
      the “Support services” sector and the “market” topic. This could be
      due to a larger market size or more significant events related to
      this sector. Conversely, Poland has the lowest intensity, suggesting
      a smaller market size or less activity in the “Support services”
      sector. The actual reasons could vary and might need more detailed
      data for accurate conclusions. This analysis provides valuable
      insights into the market dynamics of different countries.`,
      icon: <BsFileBarGraphFill />,
    },
    {
      id: 2,
      link: "/linechart",
      title: "Country-wise Intensity Analysis",
      description: `The “Year-wise Intensity Analysis” graph compares intensity across years.
       The intensity, derived from various parameters, shows no data for 2106, possibly due to 
       lack of significant events in the “Support services” sector and “market” topic that year.
        For other years, the graph is consistent, indicating steady market dynamics in the “Support
         services” sector. This could be due to a stable market size or significant events related to
          this sector. However, these are interpretations based on the given data, and actual reasons
           may vary. More detailed data might be needed for accurate conclusions. This analysis offers
            insights into market dynamics across years.`,
      icon: <BsGraphUp />,
    },
    {
      id: 3,
      link: "/scatterplot",
      title: "Likelihood-Relevance Analysis",
      description: `The “Likelihood-Relevance Analysis” graph is a scatter plot representing the likelihood
       and relevance of various factors in the “Support services” sector. When the PESTLE filter is applied,
        the data points are concentrated in the 0-20 range for both relevance and likelihood. This suggests 
        that most events or insights in this sector have a moderate likelihood of occurrence and relevance.
         The concentration of data points in this range could indicate a stable market environment with 
         predictable trends and impacts. However, these interpretations are based on the given data,
          and actual insights may vary based on more detailed or additional data.`,
      icon: <VscGraphScatter />,
    },
  ];
  return (
    <div className=" chart-area">
      <h1 className="report-header">Analysis</h1>
      <div className="report-area">
        {graphdata.map(({ id, link, title, description, icon }) => (
          <div className="report-card" key={id}>
            <h3 className="report-card-title">{title}</h3>
            <p className="report-data">{description}</p>
            <button className="graph-button" onClick={() => routeChange(link)}>
              <span className="icon">{icon}</span>Go to graph
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
