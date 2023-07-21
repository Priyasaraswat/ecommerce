import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import "./profile.css";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {/* meta data daalna hai */}
      {loading ? (
        <Loader />
      ) : (
       
        <>
         <MetaData title="PROFILE"></MetaData>
        < div className="profile-main">
          <h2 className="profileHeading">My Profile</h2>
          <div className="profileContainer">
            <div className="div-1">
              <img
                src={ "/profile.png"}
                alt={user.name}
              />
              <Link to="/profile/update" className="editLink">Edit Profile</Link>
            </div>
            <div className="div-2">
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user.createdAt).substr(0, 10)}</p>
              </div>
              <div className="profile-link">
                <Link to="/orders" className="profile-link-1">My Orders</Link>
                <Link to="/password/update" className="profile-link-2">Change Password</Link>
              </div>
            </div>
          </div>
        </ div>
        </>
      )}
    </>
  );
};

export default Profile;
