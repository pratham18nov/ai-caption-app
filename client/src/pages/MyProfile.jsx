import React, { useState } from 'react'
import userImg from '../assets/user.png'
import {motion} from 'motion/react'
import { MdFacebook } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import EditProfile from '../components/EditProfile';

// const MyProfile = ({user}) => {
const MyProfile = () => {

  const navigate = useNavigate()
  const [showUpdateBox, setShowUpdateBox] = useState(false)

  const user = JSON.parse(localStorage.getItem("userData"))

  const capArray = [
    {
      id: '1',
      title: "A serene mountain landscape with a crystal clear lake reflecting the snow-capped peaks",
    },
    {
      id: '2',
      title: "Majestic mountains rising above a tranquil alpine lake at sunset",
    },
    {
      id: '3',
      title: "Nature's mirror: perfect mountain reflections in a pristine lake",
    },
    {
      id: '4',
      title: "Breathtaking view of mountain ranges surrounding a peaceful lake",
    },
    {
      id: '5',
      title: "The calm waters of a mountain lake perfectly mirroring the surrounding peaks",
    },
  ]

  // const handleEdit = (e) =>{
  //   e.preventDefault()
  //   navigate('/edit-profile')
  // }

  const handleSave = () =>{
    try {
      console.log("first")
    } catch (err) {
      console.log("first", err)
    }
  }

  return (
    <section className='px-8 flex flex-col gap-4 max-md:mt-24'>
        {/* profile */}
        <section className='h-56 w-full flex max-md:flex-col justify-center items-center gap-24 max-md:gap-4 max-[450px]:mb-6'>
            <img src={user?.profilePic || userImg} alt='profile-img' className='w-48 h-48 rounded-full object-cover' />
            <div className='text-center'>
                <p className='text-5xl max-sm:text-3xl font-bold'>{user?.firstName} {user?.lastName}</p>
                <span className='opacity-75'>{user?.email}</span>
            </div>
            <button onClick={()=>setShowUpdateBox(true)} className='btn '>Edit</button>
        </section>

        {/* liked captions */}
        <section className='max-md:mt-12'>
          <div className='flex justify-between px-2'>
            <p className='pt-4 text-2xl font-bold'>Liked Captions</p>
            <Link to={'/user-liked-captions'} className='btn '>View all</Link>
          </div>
          <div>
            <div className='flex max-md:flex-col gap-4 mt-4'>
              {
                capArray.length ? (
                  capArray.map((data, index)=>{
                    return(
                      <motion.div key={index} initial={{x:-index*(158)}} 
                        animate={{x:index*0}} 
                        transition={{duration:1, delay:index*1/3,}}
                        style={{zIndex: data.length-index}}
                        className='border border-slate-700 rounded-lg p-4 flex flex-col gap-4 bg-[#E2E8F0] dark:bg-[#1a1a1a]'>
                        <p className='text-slate-700 dark:text-slate-300'>{data.title}</p>
                      </motion.div> 
                    )
                  })
                ) : (
                  <div>No data found</div>
                ) 
              }
            </div>
          </div>
        </section>

        <section className='w-full flex max-md:flex-col justify-between gap-12'> 
          {/* counts */}
          <section className='md:w-[45%] '>
              <p className='pt-4 text-2xl font-bold'>Statistics</p>
              <div className='flex max-[545px]:flex-col justify-between max-[545px]:items-center max-[545px]:gap-4 mt-4 text-center'>
                <div className='stat-btn min-w-36 flex flex-col justify-center items-center  '>
                  <p className='text-4xl'>{user?.statistics.uploadCount}</p>
                  <span className='opacity-75'>Uploads</span>
                </div>
                <div className='stat-btn min-w-36 flex flex-col justify-center items-center  '>
                  <p className='text-4xl'>{user?.statistics.totalLikes}</p>
                  <span className='opacity-75'>Likes</span>
                </div>
                <div className='stat-btn flex flex-col justify-center items-center  '>
                  <p className='text-4xl'>{user?.statistics.uploadCount *5}</p>
                  <span className='opacity-75'>Captions generated</span>
                </div>
              </div>
          </section>

          {/* socials */}
          <section className='md:w-[45%] '>
              <p className='pt-4 text-2xl font-bold '>Social Links</p>
              <div className='flex max-[545px]:flex-col justify-between max-[545px]:items-center max-[545px]:gap-4 mt-4'>
                <Link to={''} className='stat-btn text-4xl min-w-36 flex justify-center items-center'><MdFacebook/></Link>
                <Link to={''} className='stat-btn text-4xl min-w-36 flex justify-center items-center'><GrInstagram/></Link>
                <Link to={''} className='stat-btn text-4xl min-w-36 flex justify-center items-center'><FaXTwitter/></Link>
              </div>
          </section>
        </section>

        <EditProfile open={showUpdateBox} onClose={()=>setShowUpdateBox(false)} user={user} onSave={handleSave} />
    </section>
  )
}

export default MyProfile