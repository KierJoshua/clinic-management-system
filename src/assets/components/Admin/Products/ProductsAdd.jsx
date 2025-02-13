import React, { useState } from "react";

const ProductsAdd = ({ addProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    id: "",
    image: "",
    price:"",
    stocks:"",
    branch:"", 
  });

  const [previewImage, setPreviewImage] = useState(null); // For previewing the image

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === "image" && files.length > 0) {
      // Handle image file
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result })); // Update image as Base64
      };
      reader.readAsDataURL(file); // Convert file to Base64
    } else {
      // Handle other inputs
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  

  const handleSelectDropdown = (category) => {
    setFormData((prev) => ({ ...prev, category }));
    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
      dropdown.removeAttribute("open");
    }
  };

  const handleSave = () => {
    if (
      !formData.name ||
      !formData.id ||
      !formData.image ||
      !formData.description ||
      !formData.category
    ) {
      alert("Please fill all required fields.");
      return;
    }

    addProduct(formData);

    document.getElementById("my_modal_1").close();

    setFormData({
      name: "",
      description: "",
      category: "",
      id: "",
      image: "",
      price:"",
      stocks:"",
      branch:"",
    });

    setPreviewImage(null); // Clear preview
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
            <h1 className="py-2 px-3 mx-auto font-bold">Add Product</h1>
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
              Product Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Branch Name:
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Categories:
              <details className="dropdown">
                <summary className="cursor-pointer">
                  {formData.category}
                </summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-center cursor-pointer gap-1">
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdown("Category 1")}
                  >
                    Category 1
                  </li>
                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdown("Category 2")}
                  >
                    Category 2
                  </li>

                  <li
                    className="hover:bg-gray-400 hover:rounded"
                    onClick={() => handleSelectDropdown("Category 3")}
                  >
                    Category 3
                  </li>
                </ul>
              </details>
            </label>

            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description:
              </label>
              <div className="mt-2">
                <textarea
                  value={formData.description}
                  onChange={handleInputChange}
                  name="description"
                  rows={3}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-900"
              >
                Upload Image:
              </label>
              <input
                type="file"
                className="file-input file-input-bordered file-input-success w-full max-w-full"
                name="image"
                onChange={handleInputChange}
              />
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full max-w-xs"
                  />
                </div>
              )}
            </div>

            <label className="input input-bordered flex items-center gap-2">
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <label className="input input-bordered flex items-center gap-2">
              Stocks:
              <input
                type="number"
                name="stocks"
                value={formData.stocks}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
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

export default ProductsAdd;
