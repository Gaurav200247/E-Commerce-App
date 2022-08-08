import React from "react";
import { useSelector } from "react-redux";
import Loading from "../Layouts/Loader/Loading";
import { Link } from "react-router-dom";
import "./Profile.css";
import MetaData from "../Layouts/MetaData";

const Profile = () => {
  const { loading, user } = useSelector((state) => state.user);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title={`${user.user && user.user.name}'s Profile`} />

          <div className="profile-container">
            <div>
              <h1>My Profile</h1>
              <img
                src={
                  user.user &&
                  (user.user.avatar.url === "profilePicUrl"
                    ? "/Profile.png"
                    : user.user.avatar.url)
                }
                alt={user.user && user.user.name}
              />
              <Link
                to="/me/update"
                className="bg-yellow-400 hover:bg-orange-400 profile-edit-link"
              >
                Edit Profile
              </Link>
            </div>

            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user.user && user.user.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user.user && (user.user.email || "none")}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>
                  {String(user.user && (user.user.createdAt || "none")).substr(
                    0,
                    10
                  )}
                </p>
              </div>
              <div>
                <Link to="/orders" className="profile-imp-link">
                  My Orders
                </Link>
                <Link to="/password/update" className="profile-imp-link">
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
