import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import InventoryDropdown from "../Inventory/InventoryDropdown";
import productData from "../Products/ProductData";

const Reports = () => {
  const [selectedBranch, setSelectedBranch] = useState("Main Branch");
  const [dropdown, setDropdown] = useState("Main Branch");
  
 
  // Filter products based on category and branch
  const filteredProducts = productData.filter(
    (product) =>
    product.branch === selectedBranch
  );

  const handleSelectDropdown = (dropdownOption) => {
    setDropdown(dropdownOption);
    setSelectedBranch(dropdownOption); // Notify parent of selected value
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Reports</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="max-w-screen-lg mx-auto z-0 min-h-screen mt-20">
        <div className="grid grid-cols-12">
          <h1 className="text-2xl font-bold col-span-12 sm:col-span-6 flex items-center md:ml-24 lg:ml-0">
            Reports
          </h1>
          <div className="flex justify-end items-center col-span-12 sm:col-span-6">
            {/* Branch Dropdown */}
            <details className="dropdown w-1/2 self-end">
              <summary className="btn w-[95%] bg-gray-400">{dropdown}</summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-full p-2 shadow">
                <li onClick={() => handleSelectDropdown("Main Branch")}>
                  <a>Main Branch</a>
                </li>
                <li onClick={() => handleSelectDropdown("Corporate Branch")}>
                  <a>Corporate Branch</a>
                </li>
                <li onClick={() => handleSelectDropdown("Cabuyao Branch")}>
                  <a>Cabuyao Branch</a>
                </li>
              </ul>
            </details>

            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Choose a date</span>
              </label>
              <input
                type="date"
                class="input input-bordered w-full max-w-xs rounded-lg focus:outline-none focus:ring focus:ring-primary"
              />
            </div>
          </div>
        </div>

        {/* Filtered Products */}
        <div className="grid grid-cols-12 gap-4 mt-5">
          <div className="col-span-12">
            <table className="table-lg w-full bg-white text-black ml-24 lg:ml-0">
              <thead className="bg-green-300 border-b-2 border-black font-bold">
                <tr>
                  <th>Product Name</th>
                  <th>Purchased</th>
                  <th>Onhand</th>
                  <th>Total Stocks</th>
                  <th>Discrepancy</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td></td>
                      <td></td>
                      <td>{product.stocks}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Products Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reports;
