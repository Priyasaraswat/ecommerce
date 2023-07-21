import React ,{useEffect, useState}from "react";
import "./updatePassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { clearErrors, updatePassword,  } from "../../Actions/UserAction";
import { RiLockPasswordLine } from "react-icons/ri";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { UPDATE_PASSWORD_RESET } from "../../Constants/UserConstants";
import { BsFillKeyFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();

    const { error, loading, isUpdated } = useSelector((state) => state.profile);
  
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
 
  
    const updatePasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("oldPassword", oldPassword);
      myForm.set("newPassword", newPassword);
      myForm.set("confirmPassword",confirmPassword);
      dispatch(updatePassword(myForm));
    };
  
    
    useEffect(() => {
     
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (isUpdated) {
        alert.success("Password Updated Successfully !");
  
        navigate("/account");
        dispatch({
          type: UPDATE_PASSWORD_RESET,
        });
      }
    }, [dispatch, error, alert, isUpdated]);
  return (
    <>
     {loading?<Loader />:
    <>
    <MetaData title="Update Password" />
      <div className="updatePasswordContainer">
        <div className="updatePasswordBox">
            <h3>Update Profile</h3>
          <form
            className="updatePasswordForm"
            onSubmit={updatePasswordSubmit}
           
          >
             <div className="loginPassword">
              <BsFillKeyFill />
              <input
                type="password"
                required
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              ></input>
            </div>
            <div className="loginPassword">
              <RiLockPasswordLine />
              <input
                type="password"
                required
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              ></input>
            </div>
            <div className="loginPassword">
              <AiFillLock />
              <input
                type="password"
                required
                placeholder=" ConfirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <input value="Change Password" type="submit" className="updatePasswordBtn" />
          </form>
        </div>
      </div>
    </>}</>
  )
}

export default UpdatePassword