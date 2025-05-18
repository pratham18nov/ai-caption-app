import React from 'react'
import userImg from '../assets/user.png'

const MyProfile = ({user}) => {
  return (
    <section>
        <section>
            <img src={userImg} alt='profile-img' />
            {/* user?.profilePic ||  */}
            <div>
                <p>{user?.firstName} {user?.lastName}</p>
                <span>{user?.email}</span>
            </div>
            <button>Edit</button>
        </section>
    </section>
  )
}

export default MyProfile