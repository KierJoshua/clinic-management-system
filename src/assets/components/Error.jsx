import React from 'react'
import { Link } from 'react-router-dom'
import Dashboard from './Admin/Dashboard/Dashboard'
import PageTitle from './Admin/components/PageTitle'

const Error = () => {
  return (
    <div className='w-full mx-36 md:mx-[204px] lg:mx-96'> <PageTitle title= 'error 404 not found!...' /> <Link to='/'><button className='btn btn-link'>Click Here</button></Link></div>
  )
}

export default Error