import React from "react";
import {
  BsGrid1X2Fill,
  BsFileBarGraphFill,
  BsGraphUp,
  BsPeopleFill,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";
import { VscGraphScatter } from "react-icons/vsc";
import { RxCross2 } from "react-icons/rx";
import { MdAnalytics } from "react-icons/md";
import { NavLink } from "react-router-dom";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const currentColor = "#4477CE";
  const links = [
    {
      id: 1,
      link: "dashboard",
      child: (
        <>
          <BsGrid1X2Fill className="icon" /> Dashboard
        </>
      ),
    },
    {
      id: 2,
      link: "barchart",
      child: (
        <>
          <BsFileBarGraphFill className="icon" /> BarChart
        </>
      ),
    },
    {
      id: 3,
      link: "linechart",
      child: (
        <>
          <BsGraphUp className="icon" /> LineChart
        </>
      ),
    },
    {
      id: 4,
      link: "scatterplot",
      child: (
        <>
          <VscGraphScatter className="icon" /> Scatterplot
        </>
      ),
    },
    {
      id: 5,
      link: "Reports",
      child: (
        <>
          <BsMenuButtonWideFill className="icon" /> Reports
        </>
      ),
    },
  ];
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
    >
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <MdAnalytics className="icon_header" /> ANALYSIS
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          <RxCross2 />
        </span>
      </div>

      <ul className="sidebar-list">
        {links.map(({ id, link, child }) => (
          <li key={id} className="sidebar-list-item">
            <NavLink
              to={`/${link}`}
              style={({ isActive }) => ({
                color: isActive ? currentColor : "",
              })}
            >
              {child}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
