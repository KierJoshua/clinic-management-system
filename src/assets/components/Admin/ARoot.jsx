import React from 'react'
import AHeader from './components/AHeader'
import ASidebar from './components/ASidebar'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AFooter from './components/AFooter'

const ARoot = () => {
    const [expand, setExpand] = useState(true);

    const toggleExpand = () => setExpand(!expand);
  return (
    <>
    <div className="flex flex-col overflow-x-hidden">
        
    {/* Sidebar */}
    <ASidebar expand={expand} toggleExpand={toggleExpand} />
    

    {/* Main Content */}

      <AHeader toggleExpand={toggleExpand} expand={expand} />

    <Outlet />
    <AFooter />
  </div>

  </>
  )
}

export default ARoot