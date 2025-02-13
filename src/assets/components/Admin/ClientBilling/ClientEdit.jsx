import React, { useState, useEffect } from "react";

const ClientEdit = ({ selectedClient, updateBillingHandler, handleDelete }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    totalBilling: "",
    amountPaid: "",
    remainingBalance: "",
    dueDate: "",
    id:""
  });

  // Update form data when selectedClient changes
  useEffect(() => {
    if (selectedClient) {
      setFormData({
        companyName: selectedClient.companyName,
        totalBilling: selectedClient.totalBilling,
        amountPaid: selectedClient.amountPaid,
        remainingBalance: selectedClient.remainingBalance,
        dueDate: selectedClient.dueDate,
        id: selectedClient.id
      });
    }
  }, [selectedClient]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!formData.companyName || !formData.totalBilling || !formData.dueDate) {
      alert("Please fill all required fields.");
      return;
    }

    updateBillingHandler(formData); // Update billing data
    setFormData({
      companyName: "",
      totalBilling: "",
      amountPaid: "",
      remainingBalance: "",
      dueDate: "",
    }); // Reset form
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box">
        <div className="card bg-white border">
          <div className="card-header bg-green-400 w-full flex p-2">
            <form method="dialog">
              <button className="p-2 rounded-lg hover:bg-gray-300">
                <h1 className="font-bold">✕</h1>
              </button>
            </form>
            <h1 className="py-2 px-3 mx-auto font-bold">Edit Billing</h1>
          </div>
          <div className="card-body">
            <label className="input input-bordered flex items-center gap-2">
              Client Name:
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="grow"
                placeholder="type here"
              />
            </label>

            <div className="flex gap-1">
              <label className="input input-bordered gap-2 w-1/2">
                Total Billing:
                <input
                  type="number"
                  min="1"
                  name="totalBilling"
                  value={formData.totalBilling}
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="type here"
                />
              </label>

              <label className="input input-bordered gap-2 w-1/2">
                Amount Paid:
                <input
                  type="number"
                  min="1"
                  name="amountPaid"
                  value={formData.amountPaid}
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="type here"
                />
              </label>
            </div>

            <div className="flex gap-1">
              <label className="input input-bordered gap-2 w-1/2">
                Remaining Balance:
                <input
                  type="number"
                  name="remainingBalance"
                  value={formData.remainingBalance}
                  onChange={handleInputChange}
                  className="grow"
                  placeholder="type here"
                />
              </label>

              <label className="input input-bordered gap-2 w-1/2">
                Due Date:
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="grow"
                />
              </label>
            </div>

            <div className="flex text-black mt-2">
              <button
                className="btn btn-primary text-black hover:text-white"
                onClick={handleSave}
              >
                Save
              </button>
              <form method="dialog">
                <button
                  className="btn bg-red-600 hover:bg-red-800 hover:text-white"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent form submission
                    handleDelete();
                  }}
                >
                  delete
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ClientEdit;
