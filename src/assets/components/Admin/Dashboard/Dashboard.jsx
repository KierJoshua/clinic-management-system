import React from "react";
import DStocks from "./DStocks";
import THeader from "../components/THeader";
import clientBillingData from "../ClientBilling/ClientBillingData";
import ClientBillingActions from "../ClientBilling/ClientBillingActions";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DashboardBarGraph from "./DashBoardBargraph";

const Dashboard = () => {
  const limitedClient = clientBillingData.slice(0, 3);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home|Dashboard</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div className="max-w-screen-lg mx-auto z-0 min-h-screen mt-20 ">
        <h1 className=" text-2xl font-bold col-span-2 flex items-center ml-28 md:ml-24 lg:ml-0">
          Dashboard
        </h1>

        {/* <div className="flex flex-col flex-wrap xl:flex-nowrap justify-center gap-5 space-y-4 sm:space-y-0 md:flex-row mt-5 w-full"> */}
        <div className="grid grid-cols-1 ml-10 md:ml-24 lg:ml-0 sm:grid-cols-3 gap-2 m-2 mt-5">
          <DStocks title="Main Branch Stocks" count={44} />
          <DStocks title="Main Branch Stocks" count={44} />
          <DStocks title="Main Branch Stocks" count={44} />
        </div>

        <hr className="border-4 rounded my-8 border-slate-300" />

        <div className="overflow-x-auto">
          <DashboardBarGraph />
        </div>

        <h1 className=" text-2xl font-bold col-span-2 flex items-center ml-28 md:ml-24 lg:ml-0">
          Company Billing Overview
        </h1>

        <div className="overflow-x-auto">
          <table className="table-xs sm:table-sm md:table-lg w-full bg-white text-black ml-20 sm:ml-24 mt-8 lg:ml-0">
            <THeader
              header1="Client Name"
              header2="Total Billing"
              header3="Amount Paid"
              header4="Remaining Balance"
              header5="Due Date"
              header6="Action"
            />
            <tbody>
              {limitedClient.length > 0 ? (
                limitedClient.map((client, index) => (
                  <tr key={index}>
                    <td>{client.companyName}</td>
                    <td>{client.totalBilling}</td>
                    <td>{client.amountPaid}</td>
                    <td>{client.totalBilling - client.amountPaid}</td>
                    <td>{dayjs(client.dueDate).format("YYYY-MM-DD")}</td>
                    <td>
                      <ClientBillingActions />
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
        <div className="flex justify-center">
          <Link to="client-billing">
            <button className="btn bg-green-700 hover:bg-green-500 text-white px-6 mt-5" title="View All">
              View All
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
