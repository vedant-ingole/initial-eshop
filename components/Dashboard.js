import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../redux/userStore'
import { auth } from '../firebase'

const Dashboard = () => {

    const user = useSelector(selectUser)

    const handleLogout = () => {
        if(window.confirm("Do you want to log out?")){
            auth.signOut()
        }
    }

    return (
        <div className="container">
            <h1>Welcome</h1>
            {/* {
                user && 
                    <> */}
                        <img src={user.pic} alt="" className='m-auto w-20' />
                        <p>id : {user.id}</p>
                        <p>name : {user.name}</p>
                        <p>verified : {user.verified}</p>
                    {/* </> */}
             {/* } */}

            <button className='auth-button' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Dashboard
