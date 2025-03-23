import React from 'react'
import { FiUpload } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/typography-bird.png'
import SummaryApi from '../helpers/SummaryApi';
import {toast} from 'react-toastify'


const Header = () => {
  const user = localStorage.getItem("authToken")
  const navigate = useNavigate()

  const handleLogout = async() =>{
    // e.preventDefault()
    localStorage.clear();

    const fetchData = await fetch(SummaryApi.userLogout.url, {
      method: SummaryApi.userLogout.method,
      credentials: "include"
    })
    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      navigate('/')

    }
    if(data.error){
      toast.error(data.message)
    }
  }

  return (
    <section className='fixed w-full h-16 z-10'>
      <div className='w-full h-16 backdrop-blur-lg flex items-center absolute'></div>

      <div className='w-full flex justify-between relative px-12 max-md:px-4 py-2'>
        <Link to='/' className='flex justify-center items-center gap-2'>
          <img src={logo} alt='logo' className='w-10 h-10 invert-0 dark:invert'/>
          <span className='text-gray-900 dark:text-white/87 text-4xl font-bold'>PicLingo</span>
        </Link>
        <div className='flex items-center gap-8 max-md:hidden'>
          <Link to='/'><span className='text-gray-900 dark:text-white/87'>Home</span></Link>
          <Link to='/upload'><span className='text-gray-900 dark:text-white/87'>Upload</span></Link>
          <Link to='/about'><span className='text-gray-900 dark:text-white/87'>About</span></Link>
        </div>
        <div className='flex items-center gap-8'>
          <ThemeToggle/>
          <Link to='/upload' className='btn flex items-center gap-2 text-gray-900 dark:text-white/87 max-sm:hidden'>
            <i className='text-gray-900 dark:text-white/87'><FiUpload/></i>
            <span className=' text-gray-900 dark:text-white/87 inline-block'>Upload</span>
          </Link>
          <div>
            { 
              user ? (
                <span onClick={handleLogout} className='btn inline-block text-gray-900 dark:text-white/87'>Logout</span>
              ) : (
                <Link to='/login'>
                  <span className='btn inline-block text-gray-900 dark:text-white/87'>Login</span>
                </Link>
              ) 
            }
          </div>
          {/* <Link to='/login' className='btn'>
            <span className='inline-block  text-gray-900 dark:text-white/87'>
              {
                user ? ("Logout") : ("Login")
              }
            </span>
          </Link> */}
        </div>
      </div>
      <div className='h-[1px] bg-slate-600'></div>
    </section>
  )
}

export default Header