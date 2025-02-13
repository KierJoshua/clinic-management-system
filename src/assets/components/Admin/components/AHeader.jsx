import React from 'react'
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import logo from "../img/logo.png"

const AHeader = ({ toggleExpand, expand }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    
  return (
        <section id="header" className="fixed top-0 left-0 w-full bg-[#94d8a8] z-50 ">
        <div className="flex justify-between items-center w-full px-4 py-3">
            <button
                className="p-1.5 rounded-lg hover:bg-[#c6faeb]"
                onClick={toggleExpand}
            >
                {expand ? <FaChevronLeft /> : <FaChevronRight />}
            </button>
            <div>
                <h1 className="tracking-widest font-bold text-lg">OPTIC OPS</h1>
            </div>
            <div className="flex items-center relative">
                <img src={logo} alt="Logo" className="w-10" />
                <h1 className="self-center mx-2">Main Admin</h1>
                <h1
                    className="self-center cursor-pointer"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                    <FaChevronDown />
                </h1>

                {/* Dropdown Menu */}
                {dropdownVisible && (
                    <div className="absolute top-10 right-0 w-32 border p-2 bg-white shadow-md rounded">
                        <ul className="text-center p-1">
                            <li className="cursor-pointer hover:bg-gray-100">Activities</li>
                            <li className="cursor-pointer hover:bg-gray-100">Logout</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
        
    </section>
  )
}

export default AHeader