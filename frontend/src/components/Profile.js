import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate('');

  useEffect(() => {
    // Assume karo ki user data localStorage ya backend se mil raha hai
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);
  const HandleLogout =()=>{
   localStorage.clear();
   navigate('/Signup');
  }

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      {user ? (
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button className="btn" onClick={HandleLogout}>Logout</button>
         
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;