import React from 'react'
import img from '../assets/banner.png'
import img1 from '../assets/feature1.png'
import img2 from '../assets/feature2.png'
import img3 from '../assets/feature3.png'
import img4 from '../assets/feature4.png'


const Banner = () => {
  return (
    <div>
        <div className='w-full flex items-center justify-between bg-[#EFAA74]/20 px-16'>
            <div className='text-3xl flex flex-col gap-2 font-semibold'>
                <p>Building a</p>
                <p className='text-[#FFFFFF]'>Stronger Workforce,</p>
                <p>One Job at a Time!</p>
            </div>
            <img src={img} alt="laborledger-banner" className='w-1/3' />
        </div>
        <div className='flex text-xl p-20 justify-between px-36 '>
            <div className='flex flex-col items-center'>
                <img src={img1} alt="laborledger-feature1" className='w-16' />
                <p className='pt-5'>Grievance</p>
                <p>Mechanism</p>
            </div>
            <div className='flex flex-col items-center'>
                <img src={img2} alt="laborledger-feature2" className='w-16' />
                <p className='pt-7'>Simplified</p>
                <p> Payments</p>
            </div>
            <div className='flex flex-col items-center'>
                <img src={img3} alt="laborledger-feature3" className='w-16' />
                <p className='pt-5'>Easy Job</p>
                <p> Hunt</p>
            </div>
            <div className='flex flex-col items-center'>
                <img src={img4} alt="laborledger-feature4" className='w-16' />
                <p className='pt-5'>Streamline</p>
                <p> Dispute</p>
                <p> Management</p>
            </div>
        </div>
    </div>
  )
}

export default Banner