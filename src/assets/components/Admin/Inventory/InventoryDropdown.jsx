import React, { useState } from "react";

const InventoryDropdown = ({ title, dropdown1, dropdown2, onSelect }) => {
  const [dropdown, setDropdown] = useState(title);

  const handleSelectDropdown = (dropdownOption) => {
    setDropdown(dropdownOption);
    onSelect(dropdownOption); // Notify parent of selected value
  };
  return (
    <details className="dropdown w-1/2">
      <summary className="btn w-[95%] bg-gray-400">{dropdown}</summary>
      <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
        <li onClick={() => handleSelectDropdown(title)}>
          <a>{title}</a>
        </li>
        <li onClick={() => handleSelectDropdown(dropdown1)}>
          <a>{dropdown1}</a>
        </li>
        <li onClick={() => handleSelectDropdown(dropdown2)}>
          <a>{dropdown2}</a>
        </li>
      </ul>
    </details>
  );
};

export default InventoryDropdown;
