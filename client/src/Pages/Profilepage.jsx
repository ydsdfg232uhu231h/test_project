import "./Profilepage.css";
import React from 'react'
function Profilepage() {
  const userdata = JSON.parse(localStorage?.getItem("usersdata"));
  console.log(userdata)
  return (
    <>
        <div id="profilecontainer">
        <div id='profile'>
            <img src="../../src/assets/defaultuserimage.png" alt="uable to load the image" />
            <h1>{userdata.firstname} {userdata.lastname}</h1>
            <h2>{userdata.role}</h2>
            <h3>{userdata.email}</h3>
            
            <p>Gender: {userdata.gender}</p>
            <p>Phone: {userdata.phone}</p>
        </div>

        </div>
    </>
  )
}

export default Profilepage