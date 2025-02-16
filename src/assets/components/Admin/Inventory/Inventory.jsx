import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import InventoryDropdown from "./InventoryDropdown";
import productData from "../Products/ProductData";

const Inventory = () => {
  const [selectedCategory, setSelectedCategory] = useState("Eyeglass Frames");
  const [selectedBranch, setSelectedBranch] = useState("Main Branch");


  // Filter products based on category and branch
  const filteredProducts = productData.filter(
    (product) =>
      product.category === selectedCategory && product.branch === selectedBranch
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Inventory Report</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="max-w-screen-lg mx-auto z-0 min-h-screen mt-20">
        <div className="grid grid-cols-12  gap-3 ml-24 sm:mx-auto"> 
          <h1 className="text-2xl font-bold col-span-12 sm:col-span-2 flex items-center md:ml-24 lg:ml-0">
            Inventory
          </h1>
          <div className="col-span-12 sm:col-span-6">
            {/* Branch Dropdown */}
            <InventoryDropdown
              title="Main Branch"
              dropdown1="Corporate Branch"
              dropdown2="Cabuyao Branch"
              onSelect={setSelectedBranch}
            />
            {/* Category Dropdown */}
            <InventoryDropdown
              title="Eyeglass Frames"
              dropdown1="Lens"
              dropdown2="Others"
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="col-span-12 sm:col-span-4">
            <div className="flex justify-start sm:justify-end gap-2">
              <Link to="products">
                <button className="btn btn-active">Manage Products</button>
              </Link>
              <Link to="reports"><button className="btn btn-active">Reports</button></Link>
            
            </div>
          </div>
        </div>

        {/* Filtered Products */}
        <div className="grid grid-cols-12 gap-4 mt-5 overflow-x-auto sm:overflow-x-hidden">
          <div className="col-span-12 sm:col-span-8">
            <table className="table-xs sm:table-sm md:table-lg w-full bg-white text-black ml-20 sm:ml-24 lg:ml-0">
              <thead className="bg-green-300 border-b-2 border-black font-bold">
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.stocks}</td>
                      <td>
                        <span
                          className={`text-sm px-2 sm:px-3 sm:py-2 rounded ${
                            product.stocks <= 0
                              ? "bg-black text-white"
                              : product.stocks > 5
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {product.stocks <= 0
                            ? "No Stock"
                            : product.stocks > 5
                            ? "In Stock"
                            : "Low Stock"}
                        </span>
                      </td>
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
          <div className="col-span-12 sm:col-span-4">
            <table className="table-lg w-full bg-white text-black ml-20 sm:ml-24 lg:ml-0 mb-5">
              <thead className="bg-red-400 border-b-2 border-black font-bold">
                <th colSpan="3">Low Stocks</th>
              </thead>
              <thead className="bg-green-300 border-b-2 border-black font-bold">
                <tr>
                  <th>Branch</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {productData.filter((product) => product.stocks <= 5).length >
                0 ? (
                  productData
                    .filter((product) => product.stocks <= 5)
                    .map((product, key) => (
                      <tr key={key}>
                        <td>{product.branch}</td>
                        <td>{product.name}</td>
                        <td>{product.stocks}</td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="3">No Low Stocks</td>
                  </tr>
                )}
              </tbody>
            </table>

            <table className="table-lg w-full bg-white text-black ml-20 sm:ml-24 lg:ml-0">
              <thead className="bg-red-400 border-b-2 border-black font-bold">
                <th colSpan="3">Stock Requests</th>
              </thead>
              <thead className="bg-green-300 border-b-2 border-black font-bold">
                <tr>
                  <th>Branch</th>
                  <th>Product</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventory;
