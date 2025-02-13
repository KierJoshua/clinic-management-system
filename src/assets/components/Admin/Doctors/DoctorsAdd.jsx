import React, { useState } from "react";

const DoctorsAdd = ({addDoctor}) => {
  const [formData, setFormData] = useState({
    doctorName:"",
    licenseNumber: "",
    status:"Select",
    id:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update formData for other inputs
  };


  const handleSelectDropdownStatus = (status) => {
    setFormData((prev) => ({ ...prev, status })); // Update the status field in formData
    const dropdown = document.querySelector(".dropdown-status");
    if (dropdown) {
      dropdown.removeAttribute("open"); // Close the dropdown
    }
  };

  const handleSave = () => {
    if (!formData.doctorName || !formData.licenseNumber || !formData.status || !formData.id) {
        alert("Please fill all required fields.");
        return;
      }
    // console.log(formData);
    addDoctor(formData);

    document.getElementById("my_modal_1").close();

    setFormData({
      doctorName:"",
      licenseNumber: "",
      status:"Select",
      id:"",
    })
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <div className="card bg-white border">
          <div className="card-header bg-green-400 w-full flex p-2">
            <form method="dialog">
              <button className="p-2 rounded-lg hover:bg-gray-300">
                <h1 className="font-bold">✕</h1>
              </button>
            </form>
            <h1 className="py-2 px-3 mx-auto font-bold">Add Doctor</h1>
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
              Doctor Name:
              <input
                type="text"
                name="doctorName"
                value={formData.doctorName}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              License No.:
              <input
                type="number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>


            <label className="input input-bordered flex items-center gap-2">
              Status:
              <details className="dropdown dropdown-status">
                <summary className="cursor-pointer">{formData.status}</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-center cursor-pointer gap-1">
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdownStatus("ACTIVE")}
                  >
                    ACTIVE
                  </li>
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdownStatus("INACTIVE")}
                  >
                    INACTIVE
                  </li>
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdownStatus("DEACTIVATED")}
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
                <button className="btn bg-red-600 hover:bg-red-800 hover:text-white">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default DoctorsAdd;
