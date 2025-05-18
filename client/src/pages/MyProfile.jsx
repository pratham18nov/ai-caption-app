import React from 'react'
import userImg from '../assets/user.png'

const MyProfile = ({user}) => {
  return (
    <section>
        <section className='h-56 w-full flex justify-center items-center gap-24'>
            <img src={userImg} alt='profile-img' className='w-48 h-48 rounded-full object-cover' />
            {/* user?.profilePic ||  */}
            <div className='text-center'>
                <p className='text-5xl max-sm:text-3xl font-bold'>{user?.firstName} {user?.lastName}</p>
                <span className='opacity-75'>{user?.email}</span>
            </div>
            <button className='btn '>Edit</button>
        </section>

        <section>
          <p>Liked Captions</p>
        </section>
    </section>
  )
}

export default MyProfile