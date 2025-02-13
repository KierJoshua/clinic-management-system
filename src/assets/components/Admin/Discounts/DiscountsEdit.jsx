import React, { useEffect, useState } from "react";

const DiscountsEdit = ({selectedDiscount, editDiscount, deleteDiscount}) => {
  const [formData, setFormData] = useState({
    discountName: "",
    status: "Select",
    id: '', 
    discountPercentage: '',// Initialize with a default value
  });

  useEffect(()=>{
    if(selectedDiscount){
     setFormData({
      discountName: selectedDiscount.discountName,
      status: selectedDiscount.status,
      id: selectedDiscount.id, 
      discountPercentage: selectedDiscount.discountPercentage,
     })
    }
  },[selectedDiscount])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update formData for other inputs
  };

  const handleSelectDropdown = (status) => {
    setFormData((prev) => ({ ...prev, status })); // Update the status field in formData
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
      dropdown.removeAttribute("open"); // Close the dropdown
    }
  };

  const handleSave = () => {
    if (!formData.discountName || !formData.status || !formData.discountPercentage) {
        alert("Please fill all required fields.");
        return;
      }

    editDiscount(formData);

    document.getElementById("my_modal_2").close();

    setFormData({
      discountName: "",
      status: "Select",
      id: '', 
      discountPercentage: '',
    })
  };

  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box">
        <div className="card bg-white border">
          <div className="card-header bg-green-400 w-full flex p-2">
            <form method="dialog">
              <button className="p-2 rounded-lg hover:bg-gray-300">
                <h1 className="font-bold">✕</h1>
              </button>
            </form>
            <h1 className="py-2 px-3 mx-auto font-bold">Edit Discount</h1>
          </div>
          <div className="card-body">

          <label className="input input-bordered flex items-center gap-2">
              ID:
              <input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Discount Name:
              <input
                type="text"
                name="discountName"
                value={formData.discountName}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Discount Percentage:
              <input
                type="number"
                name="discountPercentage"
                value={formData.discountPercentage}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Status:
              <details className="dropdown">
                <summary className="cursor-pointer">{formData.status}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-center cursor-pointer gap-1">
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdown("ACTIVE")}
                  >
                    ACTIVE
                  </li>
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdown("INACTIVE")}
                  >
                    INACTIVE
                  </li>
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdown("DEACTIVATED")}
                  >
                    DEACTIVATED
                  </li>
                </ul>
              </details>
            </label>

            <div className="flex text-black mt-2">
              <button
                className="btn btn-primary text-black hover:text-white"
                onClick={handleSave}
              >
                Save
              </button>
              <form method="dialog">
                <button className="btn bg-red-600 hover:bg-red-800 hover:text-white" onClick={() => deleteDiscount()}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DiscountsEdit;
