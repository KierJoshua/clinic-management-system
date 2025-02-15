import React from 'react'

const DStocks = ({title, count}) => {
  return (
    <div className="card rounded-3xl border drop-shadow-lg  mx-24 w-1/4 sm:mx-16 sm:w-1/2 md:w-full md:mx-auto">
          <div className="card-title bg-green-200 px-8 md:px-12 lg:px-20 py-2 w-full border-b-[1px] border-black ">
            <h1 className='text-xl w-full text-center md:whitespace-nowrap'>{title}</h1>
          </div>
          <div className="card-body bg-white">
            <h1 className='text-center font-bold text-6xl'>{count}</h1>
          </div>
        </div>
  )
}

export default DStocks