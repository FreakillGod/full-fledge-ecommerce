import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "./profile.css";
import MetaData from "../../layouts/MetaData";
import Loader from "../../layouts/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);
  return (
    <Fragment>
      {user === null ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile`} />

          <div className="profileContainer">
            <div>
              <h1>Profile</h1>
              <img src={user.avatar?.url} alt="user profile image" />
              <Link to="/me/update">Edit Profile</Link>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.email}</p>
              </div>
              <div>
                <h4>Account created on</h4>
                <p>
                  {user.createdAt
                    ? (user?.createdAt).toString().substr(0, 10)
                    : "cannot find the proper account creating data, please contact support"}
                </p>
              </div>
              <div>
                <Link to={"/cart"}>My orders</Link>
                <Link to="/password/update">Change Password</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Profile;
