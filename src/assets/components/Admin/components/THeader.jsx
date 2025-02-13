import React from 'react'

const THeader = ({header1,header2,header3,header4,header5,header6,header7}) => {
  return (
    <thead className='bg-green-300 border-b-2 border-black font-bold'>
    <tr>
      <th>{header1}</th>
      <th>{header2}</th>
      <th>{header3}</th>
      <th>{header4}</th>
      <th>{header5}</th>
      <th>{header6}</th>
      <th>{header7}</th>
    </tr>
  </thead>
  )
}

export default THeader