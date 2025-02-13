import React from "react";

const ProductsCard = ({ name, description , image, stocks, price, edit}) => {
  return (
    <div className=" sm:col-span-6 lg:col-span-4 mt-5 ml-24 lg:ml-10 xl:ml-0">
      <div className="card bg-base-100 w-80 sm:w-90 shadow-xl">
      <figure className="px-10 pt-10 cursor-pointer">
          {/* Ensure image is displayed */}
          <img
            src={image || "https://via.placeholder.com/150"} // Use placeholder if image is missing
            alt={name}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title ">{name}</h2>
          <p>{description}</p>
          {/* <div className="card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
        </div>
        <div className="card-footer text-center">
          <h1 className="border p-2">Price: {price}</h1>
          <h1 className="border p-2">Stocks: {stocks}</h1>
        </div>
        <button className="btn btn-accent self-start mx-3 my-5" onClick={() => edit()}>Edit Product</button>
      </div>
    
    </div>
  );
};

export default ProductsCard;
