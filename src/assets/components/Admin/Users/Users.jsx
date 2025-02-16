import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import THeader from '../components/THeader'
import { FiEdit } from "react-icons/fi";
import { Helmet } from 'react-helmet';
import usersData from './usesData';
import UsersAdd from './UsersAdd';
import UsersEdit from './UsersEdit';

const Users = () => {


  const[filteredUsers,setFilteredUsers] = useState([]);
  const[userData, setUserData] = useState(usersData)
  const[selectedUser, setSelectedUser] = useState(null);

  useEffect(()=>{
    const sortedUsers = [...userData].sort((a,b) => 
      a.userName.localeCompare(b.userName)
    );
    setFilteredUsers(sortedUsers);
  },[userData])

  const searchHandler = ((query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = usersData.filter((table) =>
      Object.values(table).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredUsers(filtered);
  })

  
  const openModal = () => {
    document.getElementById('my_modal_1').showModal();
  }

  const openModalEdit = (user) => {
    setSelectedUser(user);
    document.getElementById('my_modal_2').showModal();
  }

  const addUser = (newUser) => {
    setUserData((prev) => [...prev, newUser]);
  }

  const editUserHandler = (updatedUser) => {
    setUserData((prev) => 
      prev.map((user) => 
        user.id === updatedUser.id ? updatedUser : user
      )
    )
    document.getElementById("my_modal_2").close(); // Close the edit modal
  }

  const deleteUser = (userToDelete) => {
    setUserData((prev) => 
      prev.filter((user) => 
        user.id !== userToDelete.id
      )
    )
    document.getElementById("my_modal_2").close(); // Close the edit modal
  }

  


  return (
    <>
    <Helmet>
       <meta charSet="utf-8" />
       <title>Users</title>
     </Helmet>
    <div className='max-w-screen-lg mx-auto min-h-screen'>
      
      <PageTitle title="Users" searchHandler={searchHandler} openModal={openModal}/>
      <UsersAdd addUser={addUser}/>
      <UsersEdit selectedUser={selectedUser} updateUser={editUserHandler} deleteUser={ () => deleteUser(selectedUser)}/>
      <div className="overflow-x-auto my-16 shadow-xl rounded">
      <table  className="table-xs sm:table-sm md:table-lg w-full bg-white text-black  ml-24 lg:ml-0">
        <THeader 
        header1="User Name"
        header2="Role"
        header3="Branch"
        header4="Account User"
        header5="Password"
        header6="Status"
        header7="Edit"
         />

         <tbody>
      {  
      filteredUsers.length > 0 ? (
       filteredUsers.map((users, key) => 
          <tr key={key}>
          <td>{users.userName}</td>
          <td>{users.role}</td>
          <td>{users.branch}</td>
          <td>{users.accountUser}</td>
          <td><button className='btn bg-gray-500 text-white hover:bg-gray-700'>Change Password</button></td>
          <td className="text-white">
      <span
        className={`px-3 py-2 rounded ${
          users.status === "ACTIVE"
            ? 'bg-green-500'
            : users.status === "INACTIVE"
            ? 'bg-black'
            : users.status === "DEACTIVATED"
            ? 'bg-red-500'
            : ""
        }`}
      >
        {users.status}
      </span>
    </td>
          <td><button className='btn-sm bg-green-500 rounded hover:text-white mx-[2px]' onClick={() => openModalEdit(users)}>
        <FiEdit />
      </button></td>
        </tr>)) : (
  <tr>
    <td colSpan="6" className="text-center py-4">
      No usersfound
    </td>
  </tr> )
      
     }
        
         </tbody>
      </table>
      </div>
    </div>
  </>
  )
}
export default Users;