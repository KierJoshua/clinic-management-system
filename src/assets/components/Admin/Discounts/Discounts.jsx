import React, { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import discountsData from "./discountsData";
import { FiEdit } from "react-icons/fi";
import DiscountsAdd from "./DiscountsAdd";
import DiscountsEdit from "./DiscountsEdit";
import { Helmet } from "react-helmet";

const Discounts = () => {
  const [filteredDiscounts, setFilteredDiscounts] = useState([]);
  const [discountData, setDiscountData] = useState(discountsData);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  useEffect(() => {
    const sortedDiscounts = [...discountData].sort((a, b) =>
      a.discountName.localeCompare(b.discountName)
    );
    setFilteredDiscounts(sortedDiscounts);
  }, [discountData]);

  useEffect(() => {
    const savedDiscounts = localStorage.getItem('discountData');
    if (savedDiscounts) {
      try {
        setDiscountData(JSON.parse(savedDiscounts));
      } catch (error) {
        console.error("Error parsing savedDiscounts from localStorage:", error);
        setDiscountData(discountsData); // Default data in case of parsing error
      }
    } else {
      setDiscountData(discountsData); // Default data if no local storage data
    }
  }, []);

  
  const searchHandler = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = discountsData.filter((table) =>
      Object.values(table).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredDiscounts(filtered);
  };

  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const openModalEdit = (discount) => {
    setSelectedDiscount(discount);
    document.getElementById("my_modal_2").showModal();
  };

  // const addDiscount = (newDiscount) => {
  //   setDiscountData((prev) => [...prev, newDiscount]);
  // };

  const addDiscount = (newDiscount) => {
    setDiscountData((prev) => {
      const updatedData = [...prev, newDiscount];
      localStorage.setItem('discountData', JSON.stringify(updatedData)); // Save to local storage
      return updatedData;
    });
  };

  // const editDiscountHandler = (updatedDiscount) => {
  //   setDiscountData((prev) =>
  //     prev.map((discount) =>
  //       discount.id === updatedDiscount.id ? updatedDiscount : discount
  //     )
  //   );
  // };

   // Delete discount and save changes to localStorage

   const editDiscountHandler = (updatedDiscount) => {
    setDiscountData((prev) => {
      const updatedData = prev.map((discount) =>
        discount.id === updatedDiscount.id ? updatedDiscount : discount
      );
      localStorage.setItem("discountData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

   const deleteDiscount = (discountToDelete) => {
    setDiscountData((prev) => {
      const updatedData = prev.filter(
        (discount) => discount.id !== discountToDelete.id
      );
      localStorage.setItem("discountData", JSON.stringify(updatedData));
      return updatedData;
    });
    document.getElementById("my_modal_2").close(); // Close edit modal
  };


  

  

  // const deleteDiscount = (discountToDelete) => {
  //   setDiscountData((prev) =>
  //     prev.filter((discount) => discount.id !== discountToDelete.id)
  //   );
  // };
  return (
    <>
    <Helmet>
       <meta charSet="utf-8" />
       <title>Discounts</title>
     </Helmet>
    <div className="max-w-screen-lg mx-auto min-h-screen">
      <PageTitle
        title="Discounts Details"
        searchHandler={searchHandler}
        openModal={openModal}
      />
      <DiscountsAdd addDiscount={addDiscount} />
      <DiscountsEdit
        selectedDiscount={selectedDiscount}
        editDiscount={editDiscountHandler}
        deleteDiscount={() => deleteDiscount(selectedDiscount)}
      />
      <div className="overflow-x-auto my-16 shadow-xl rounded">
        <table className="table-xs sm:table-sm md:table-lg w-full bg-white text-black  ml-24 lg:ml-0">
          <thead className="bg-green-300 border-b-2 border-black font-bold">
            <tr>
              <th>Disount Name</th>
              <th>Discount Percentage</th>
              <th>Status</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiscounts.length > 0 ? (
              filteredDiscounts.map((discount, key) => (
                <tr key={key}>
                  <td>{discount.discountName}</td>
                  <td>{discount.discountPercentage}%</td>
                  <td className="text-white">
                    <span
                      className={`px-3 py-2 rounded ${
                        discount.status === "ACTIVE"
                          ? "bg-green-500"
                          : discount.status === "INACTIVE"
                          ? "bg-black"
                          : discount.status === "DEACTIVATED"
                          ? "bg-red-500"
                          : ""
                      }`}
                    >
                      {discount.status}
                    </span>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="btn-sm bg-green-500 rounded hover:text-white mx-[2px]"
                      onClick={() => openModalEdit(discount)}
                    >
                      <FiEdit />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No Discounts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Discounts;
