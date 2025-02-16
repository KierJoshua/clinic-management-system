import React, { useEffect, useState } from 'react'
import PageTitle from '../components/PageTitle'
import THeader from '../components/THeader'
import { FiEdit } from "react-icons/fi";
import doctorsData from './doctorsData';
import { Helmet } from 'react-helmet';
import DoctorsEdit from './DoctorsEdit';
import DoctorsAdd from './DoctorsAdd';

const Doctors = () => {


  const[filteredDoctors,setFilteredDoctors] = useState([]);
  const[doctorData, setDoctorData] = useState(doctorsData)
  const[selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(()=>{
    const sortedDoctors = [...doctorData].sort((a,b) => 
      a.doctorName.localeCompare(b.doctorName)
    );
    setFilteredDoctors(sortedDoctors);
  },[doctorData])

  useEffect(() => {
    const savedDoctors = localStorage.getItem('doctorData');
    if (savedDoctors) {
      setDoctorData(JSON.parse(savedDoctors));
    } else {
      setDoctorData(doctorsData); // Default data if no local storage data
    }
  }, []);
  

  const searchHandler = ((query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = doctorData.filter((table) =>
      Object.values(table).some((value) =>
        value.toString().toLowerCase().includes(lowerCaseQuery)
      )
    );
    setFilteredDoctors(filtered);
  })

  
  const openModal = () => {
    document.getElementById('my_modal_1').showModal();
  }

  const openModalEdit = (doctor) => {
    setSelectedDoctor(doctor);
    document.getElementById('my_modal_2').showModal();
  }

  // const addDoctor = (newDoctor) => {
  //   setDoctorData((prev) => [...prev, newDoctor]);
  // }

  const addDoctor = (newDoctor) => {
    setDoctorData((prev) => {
      const updatedData = [...prev, newDoctor];
      localStorage.setItem('doctorData', JSON.stringify(updatedData)); // Save to local storage
      return updatedData;
    });
  };
  

  // const editDoctorHandler = (updatedDoctor) => {
  //   setDoctorData((prev) => 
  //     prev.map((doctor) => 
  //       doctor.id === updatedDoctor.id ? updatedDoctor : doctor
  //     )
  //   )
  //   document.getElementById("my_modal_2").close(); // Close the edit modal
  // }

  const editDoctorHandler = (updatedDoctor) => {
    setDoctorData((prev) => {
      const updatedData = prev.map((doctor) => 
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor
      );
      localStorage.setItem('doctorData', JSON.stringify(updatedData)); // Update local storage
      return updatedData;
    });
    document.getElementById("my_modal_2").close();
  };
  

  // const deleteDoctor = (DoctorToDelete) => {
  //   setDoctorData((prev) => 
  //     prev.filter((doctor) => 
  //       doctor.id !== DoctorToDelete.id
  //     )
  //   )
  //   document.getElementById("my_modal_2").close(); // Close the edit modal
  // }

  const deleteDoctor = (DoctorToDelete) => {
    setDoctorData((prev) => {
      const updatedData = prev.filter((doctor) => doctor.id !== DoctorToDelete.id);
      localStorage.setItem('doctorData', JSON.stringify(updatedData)); // Update local storage
      return updatedData;
    });
    document.getElementById("my_modal_2").close();
  };
  

  


  return (
    <>
    <Helmet>
       <meta charSet="utf-8" />
       <title>Doctors</title>
     </Helmet>
    <div className='max-w-screen-lg mx-auto min-h-screen'>
      
      <PageTitle title="Doctors" searchHandler={searchHandler} openModal={openModal}/>
      <DoctorsAdd addDoctor={addDoctor}/>
      <DoctorsEdit selectedDoctor={selectedDoctor} updateDoctor={editDoctorHandler} deleteDoctor={ () => deleteDoctor(selectedDoctor)}/>
      <div className="overflow-x-auto my-16 shadow-xl rounded">
      <table  className="table-xs sm:table-sm md:table-lg w-full bg-white text-black  ml-24 lg:ml-0">
      <thead className='bg-green-300 border-b-2 border-black font-bold'>
    <tr>
      <th>Doctor Name</th>
      <th>License No.</th>
      <th>Status</th>
      <th>Edit</th>
    </tr>
  </thead>

         <tbody>
      {  
      filteredDoctors.length > 0 ? (
       filteredDoctors.map((doctors, key) => 
          <tr key={key}>
          <td>{doctors.doctorName}</td>
          <td>{doctors.licenseNumber}</td>
          <td className="text-white">
      <span
        className={`px-3 py-2 rounded ${
          doctors.status === "ACTIVE"
            ? 'bg-green-500'
            : doctors.status === "INACTIVE"
            ? 'bg-black'
            : doctors.status === "DEACTIVATED"
            ? 'bg-red-500'
            : ""
        }`}
      >
        {doctors.status}
      </span>
    </td>
          <td><button className='btn-sm bg-green-500 rounded hover:text-white mx-[2px]' onClick={() => openModalEdit(doctors)}>
        <FiEdit />
      </button></td>
        </tr>)) : (
  <tr>
    <td colSpan="6" className="text-center py-4">
      No doctor found
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
export default Doctors;