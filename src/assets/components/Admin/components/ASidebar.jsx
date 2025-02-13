import React, { createContext, useContext, useState } from "react";
import logo from "../img/logo.png"
import { IoMdHome } from "react-icons/io";
import { PiEyeglassesLight } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";
import { FaPercent } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { FaHospitalUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { FaUserDoctor } from "react-icons/fa6";


const SidebarContext = createContext();

const ASidebar = ({ expand, toggleExpand }) => {

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 transition-all duration-300 z-10 ${
          expand ? "w-64" : "w-20"
        }`}
      >
        <nav className="h-full flex flex-col bg-[#8bd4be] border-r shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={logo}
              alt="Logo"
              className={`overflow-hidden mx-auto transition-all ${
                expand ? "w-32" : "w-0"
              }`}
            />
           
          </div>
          <div><h1 className={`${expand ? 'text-center text-2xl font-bold' : 'hidden'}`}>Punzalan Optical Clinic</h1></div>

          <SidebarContext.Provider value={{ expand }}>
            {/* <ul className="flex-1 p-3">{children}</ul> */}
          <SidebarItem icon={<IoMdHome size={20} />} text="Dashboard" link="dashboard" />
          <SidebarItem icon={<FaHospitalUser size={20} />} text="Client Billing" link="client-billing" />
          <SidebarItem icon={<PiEyeglassesLight size={20} />} text="Inventory" link="inventory" />
          <SidebarItem icon={<FaBuilding size={20} />} text="Branch Records" link="branch-records" />
          <SidebarItem icon={<FaPercent size={20} />} text="Discounts" link="discounts" />
          <SidebarItem icon={<FaUserDoctor size={20} />} text="Doctors" link="doctors" />
          <SidebarItem icon={<FaUsers size={20} />} text="Users" link="users" />
          </SidebarContext.Provider>
           
           {/* {Sidebar Footer} */}
          {/* <div className="border-t flex items-center p-3 ">
            <img src={logo} alt="User" className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expand ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-600">Your Position</span>
              </div>
            </div>
          </div> */}
        </nav>
      </aside>


    </>
  );
};


const SidebarItem = ({ icon, text, alert, link }) => {
  const { expand } = useContext(SidebarContext);

  return (
    <NavLink
      to={`/${link}`}
      className={({ isActive }) =>
        `flex items-center py-2 px-3 my-1 rounded-md cursor-pointer font-medium hover:bg-[#c6faeb] text-black ${
          isActive ? 'font-bold bg-[#c6faeb]' : ''
        }`
      }
      title={text}
    >
      <li className="relative flex items-center w-full">
        {icon}
        <span
          className={`overflow-hidden transition-all duration-300 ${
            expand ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded-full bg-[#c6faeb] ${
              expand ? "" : "top-2"
            }`}
          ></div>
        )}
      </li>
    </NavLink>
  );
};


export default  ASidebar ;
