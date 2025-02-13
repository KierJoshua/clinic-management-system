import React from "react";
import { Link } from "react-router-dom";

const PageTitle = ({ title, searchHandler, add, openModal }) => {
  return (
    <div className="">
      <div className="grid sm:grid-cols-12 mt-20 gap-3 ml-24 sm:mx-auto">
        <h1 className=" text-2xl font-bold col-span-2 flex items-center md:ml-24 lg:ml-0">
          {title}
        </h1>
        <div className="form-control col-span-8">
          <input
            type="text"
            placeholder="Search"
            className="md:mx-auto lg:mx-0 input input-bordered w-80 sm:w-5/6 lg:w-auto"
            onChange={(e) => searchHandler(e.target.value)}
          />
        </div>
        <Link>
          {" "}
          <button className="btn col-span-2 w-40" onClick={openModal}>
            Add New
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageTitle;
