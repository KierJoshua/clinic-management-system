import React from 'react'

const DStocks = ({title, count}) => {
  return (
    <div className="card rounded-3xl border drop-shadow-lg mx-auto w-full">
          <div className="card-title bg-green-200 px-8 md:px-12 lg:px-20 py-2 w-full border-b-[1px] border-black ">
            <h1 className='text-xl w-full text-center whitespace-nowrap'>{title}</h1>
          </div>
          <div className="card-body bg-white">
            <h1 className='text-center font-bold text-6xl'>{count}</h1>
          </div>
        </div>
  )
}

export default DStocks