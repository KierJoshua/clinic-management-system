import React from 'react'
import { FaRegEye } from "react-icons/fa6";
import { FaFilePdf } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdLibraryAddCheck } from "react-icons/md";

const ClientBillingActions = ({openModalEdit}) => {
  return (
   <div className='flex justify-between'>
    <button title='View' className='btn-sm bg-green-500 rounded hover:text-white mx-[2px]'><FaRegEye /></button>
    <button title='Edit' className='btn-sm bg-yellow-500 rounded hover:text-white mx-[2px]'  onClick={openModalEdit}><FiEdit /></button>
    <button title='Bill' className='btn-sm bg-green-700 rounded hover:text-white mx-[2px]'><MdLibraryAddCheck /></button>
    <button title='Print PDF' className='btn-sm bg-red-600 rounded hover:text-white mx-[2px]'><FaFilePdf /></button>
   </div>
  )
}

export default ClientBillingActions