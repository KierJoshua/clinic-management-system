import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import PageTitle from "../components/PageTitle";
import THeader from "../components/THeader";
import clientBillingData from "./ClientBillingData";
import ClientBillingActions from "./ClientBillingActions";
import { Outlet } from "react-router-dom";
import ClientAdd from "./ClientAdd";
import ClientEdit from "./ClientEdit";
import { Helmet } from "react-helmet";

dayjs.extend(isSameOrAfter);

const ClientBilling = () => {
  const [filteredTable, setFilteredTable] = useState([]);
  const [billingData, setBillingData] = useState(clientBillingData);
  const [selectedClient, setSelectedClient] = useState(null); // Store selected client for editing

  useEffect(() => {
    const sortedData = [...billingData].sort((a, b) =>
      dayjs(a.dueDate).isAfter(dayjs(b.dueDate)) ? 1 : -1
    );
    setFilteredTable(sortedData);
  }, [billingData]);

  const searchHandler = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = billingData.filter((table) =>
      Object.values(table).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredTable(filtered);
  };

  const isDueToday = (dueDate) => dayjs(dueDate).isBefore(dayjs(), "day");

  const openModalEdit = (client) => {
    setSelectedClient(client); // Set selected client data
    document.getElementById("my_modal_3").showModal(); // Open the modal
  };

  const addBillingHandler = (newBilling) => {
    setBillingData((prev) => [...prev, newBilling]);
    document.getElementById("my_modal_2").close(); // Close the add modal
  };

  const updateBillingHandler = (updatedClient) => {
    setBillingData((prev) =>
      prev.map((client) =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
    document.getElementById("my_modal_3").close(); // Close the edit modal
  };

  const deleteBillingHandler = (clientToDelete) => {
    setBillingData((prev) =>
      prev.filter((client) => client.companyName !== clientToDelete.companyName)
    );
    document.getElementById("my_modal_3").close(); // Close the modal
  };

  return (
    <>
     <Helmet>
        <meta charSet="utf-8" />
        <title>Client Billing</title>
      </Helmet>
    <div className="max-w-screen-lg mx-auto min-h-screen">
      <PageTitle
        title="Client Billing"
        searchHandler={searchHandler}
        add="add-client-billing"
        openModal={() => document.getElementById("my_modal_2").showModal()}
      />
      <ClientAdd addBillingHandler={addBillingHandler} />
      <ClientEdit selectedClient={selectedClient} updateBillingHandler={updateBillingHandler} handleDelete={() => deleteBillingHandler(selectedClient)}/>
      <Outlet />
      <div className="overflow-x-auto my-16 shadow-xl rounded">
        <table className="table-lg w-full bg-white text-black  ml-24 lg:ml-0">
          <THeader
            header1="Client Name"
            header2="Total Billing"
            header3="Amount Paid"
            header4="Remaining Balance"
            header5="Due Date"
            header6="Action"
          />
          <tbody>
            {filteredTable.length > 0 ? (
              filteredTable.map((client, index) => (
                <tr key={index}>
                  <td>{client.companyName}</td>
                  <td>{client.totalBilling}</td>
                  <td>{client.amountPaid}</td>
                  <td>{client.totalBilling - client.amountPaid}</td>
                  <td
                    className={
                      isDueToday(client.dueDate)
                        ? "bg-red-500 text-white font-bold"
                        : ""
                    }
                  >
                    {dayjs(client.dueDate).format("YYYY-MM-DD")}
                  </td>
                  <td>
                    <ClientBillingActions openModalEdit={() => openModalEdit(client)} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No client found
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

export default ClientBilling;
