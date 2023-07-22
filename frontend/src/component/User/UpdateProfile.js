import React ,{useEffect, useState}from "react";
import "./updateProfile.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { loadUser,clearErrors, updateProfile } from "../../Actions/UserAction";
import { UPDATE_PROFILE_RESET } from "../../Constants/UserConstants";
import { FiMail } from "react-icons/fi";
import { RxFace } from "react-icons/rx";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate=useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }

      reader.readAsDataURL(e.target.files[0]);
    };
  };
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);

      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully !");
      dispatch(loadUser());

      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, user, isUpdated]);

  return (
    <>
    {loading?<Loader />:
    <>
    <MetaData title="Update Profile" />
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
            <h3>Update Profile</h3>
          <form
            className="updateProfileForm"
            onSubmit={updateProfileSubmit}
            encType="multipart/form-data"
          >
            <div className="updateProfileName">
              <RxFace />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              ></input>
            </div>

            <div className="updateProfileEmail">
              <FiMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              ></input>
            </div>
            {/* <div id="updateProfileImage">
              <img src={avatarPreview} alt="Avatar"></img>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProfileDataChange}
              ></input>
            </div> */}
            <input value="Update" type="submit" className="updateProfileBtn" />
          </form>
        </div>
      </div>
    </>}
    </>
  );
};

export default UpdateProfile;
