import React, { useState, useEffect } from "react";
import PageTitle from "../components/PageTitle";
import branchRecordsData from "./BranchRecordsData";
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa6";
import BranchRecordsAdd from "./BranchRecordsAdd";
import BranchRecordEdit from "./BranchRecordEdit";
import { Helmet } from "react-helmet";

const BranchRecords = () => {
  const [filteredBranch, setFilteredBranch] = useState([]);
  const [branchData, setBranchData] = useState(branchRecordsData);
  const [selectedBranch, setSelectedBranch] = useState(null);

  const openModal = () => {
    document.getElementById("my_modal_1").showModal();
  };

  const openModalEdit = (branch) => {
    setSelectedBranch(branch);
    document.getElementById("my_modal_2").showModal();
  };

  const editBranchHandler = (updatedBranch) => {
    setBranchData((prev) =>
      prev.map((branch) =>
        branch.id === updatedBranch.id ? updatedBranch : branch
      )
    );
    document.getElementById("my_modal_2").close(); // Close the edit modal
  };

  const deleteBranch = (toDeleteBranch) => {
    setBranchData((prev) =>
      prev.filter((branch) => branch.branchName !== toDeleteBranch.branchName)
    );
    // document.getElementById("my_modal_2").close();
  };

  const addBranch = (newBranch) => {
    setBranchData((prev) => [...prev, newBranch]);
  };

  useEffect(() => {
    // Automatically sort branches by branchName
    const sortedBranches = [...branchData].sort((a, b) =>
      a.branchName.localeCompare(b.branchName)
    );
    setFilteredBranch(sortedBranches);
  }, [branchData]);

  const searchHandler = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = branchData.filter((table) =>
      Object.values(table).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredBranch(filtered);
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Branch Records</title>
      </Helmet>
      <div className="max-w-screen-lg mx-auto min-h-screen">
        <PageTitle
          title="Branch Records"
          searchHandler={searchHandler}
          openModal={openModal}
        />
        <BranchRecordsAdd addBranch={addBranch} />
        <BranchRecordEdit
          updateBranchHandler={editBranchHandler}
          selectedBranch={selectedBranch}
          deleteBranch={() => deleteBranch(selectedBranch)}
        />
        <div className="overflow-x-auto my-16 shadow-xl rounded">
          <table className="table-lg bg-white text-black  ml-24 lg:ml-0 w-full">
            <thead className="bg-green-300 border-b-2 border-black font-bold">
              <tr>
                <th>Branch Name</th>
                <th>Status</th>
                <th>Patient Records</th>
                <th>Edit Branch</th>
              </tr>
            </thead>
            <tbody className="">
              {filteredBranch.length > 0 ? (
                filteredBranch.map((branches, index) => (
                  <tr key={index} className="">
                    <td>{branches.branchName}</td>
                    <td className="text-white">
                      <span
                        className={`px-3 py-2 rounded ${
                          branches.status === "ACTIVE"
                            ? "bg-green-500"
                            : branches.status === "INACTIVE"
                            ? "bg-black"
                            : branches.status === "DEACTIVATED"
                            ? "bg-red-500"
                            : ""
                        }`}
                      >
                        {branches.status}
                      </span>
                    </td>
                    <td className="">
                      <button title="view" className="btn-sm bg-yellow-500 rounded hover:text-white mx-[2px]">
                        <FaRegEye />
                      </button>
                    </td>
                    <td className="">
                      <button title="edit"
                        className="btn-sm bg-green-700 rounded hover:text-white mx-[2px]"
                        onClick={() => openModalEdit(branches)}
                      >
                        <FiEdit />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No Branches found
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

export default BranchRecords;
