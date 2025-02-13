
import './App.css'

import { createBrowserRouter, RouterProvider, NavLink, Link , BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './assets/components/Admin/Dashboard/Dashboard';
import ClientBilling from './assets/components/Admin/ClientBilling/ClientBilling';
import Products from './assets/components/Admin/Products/Products';
import BranchRecords from './assets/components/Admin/BranchRecords/BranchRecords';
import Discounts from './assets/components/Admin/Discounts/Discounts';
import Users from './assets/components/Admin/Users/Users';
import Error from './assets/components/Error';

import ARoot from './assets/components/Admin/ARoot';
import Doctors from './assets/components/Admin/Doctors/Doctors';
import Inventory from './assets/components/Admin/Inventory/Inventory';
import Reports from './assets/components/Admin/Reports/Reports';




 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ARoot />,
      children:[
        {path:"/", element:<Dashboard />},
        {path:"/dashboard", element:<Dashboard />},
        {path:"/inventory", element: <Inventory />},
        {path:"/inventory/products", element: <Products />},
        {path:"/inventory/reports", element: <Reports />},
        {path:"/client-billing", element: <ClientBilling />},
        {path:"/branch-records", element: <BranchRecords />},
        {path:"/discounts", element: <Discounts />},
        {path:"/doctors", element: <Doctors />},
        {path:"/users", element: <Users />},
      ],
      errorElement: <Error />
    },

  ]);
  
   

    const App = () => {
      return (
        <RouterProvider router={router} />
      )
    }

export default App
