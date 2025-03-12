import React from 'react'
import Navbar from '../components/Navbar'
import img from '../assets/payment.png'
import img1 from '../assets/job.png'
import { IoIosArrowForward } from "react-icons/io";

const WhyLaborLadger = () => {
  return (
    <div>
        <div>
            <h1 className='text-5xl text-center font-semibold py-20'>Why LaborLeger?</h1>
        </div>
        <div className='flex gap-16 justify-evenly items-center'>
            <img src={img} alt="laborlegder-about-payment-image"
            className='w-1/3' />
            <div className='flex flex-col gap-5'>
                <h1 className='text-4xl'>Easy Payments</h1>
                <div className='flex flex-col gap-0.5 text-xl'>
                    <p className='flex items-center'><IoIosArrowForward /> Automate all payments</p>
                    <p className='flex items-center'><IoIosArrowForward />Employees get paid without any delay</p>
                    <p className='flex items-center'><IoIosArrowForward />Immutable Payment Records</p>
                    <p className='flex items-center'><IoIosArrowForward />Real-Time Payment Tracking</p>
                </div>
            </div>
        </div>
        <div className='flex gap-16 justify-evenly items-center'>
            <div className='flex flex-col gap-5'>
                <h1 className='text-4xl'>Simplifed Hiring and Job Searching</h1>
                <div className='flex flex-col gap-0.5 text-xl'>
                    <p className='flex items-center'><IoIosArrowForward />Automate all payments</p>
                    <p className='flex items-center'><IoIosArrowForward />Employees get paid without any delay</p>
                    <p className='flex items-center'><IoIosArrowForward />Immutable Payment Records</p>
                    <p className='flex items-center'><IoIosArrowForward />Real-Time Payment Tracking</p>
                </div>
            </div>
            <img src={img1} alt="laborlegder-about-job-image"
            className='w-1/4' />
        </div>
    </div>
  )
}

export default WhyLaborLadger