import React ,{useEffect, useState}from "react";
import "./resetPassword.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { clearErrors, resetPassword,  } from "../../Actions/UserAction";
import { RiLockPasswordLine } from "react-icons/ri";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { AiFillLock } from "react-icons/ai";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate=useNavigate();
    const {token } = useParams();

    const { error, loading, success } = useSelector((state) => state.forgotPassword);
  
    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
 
  
    const resetPasswordSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
    
      myForm.set("password", password);
      myForm.set("confirmPassword",confirmPassword);
      dispatch(resetPassword(token,myForm));
    };
  
    
    useEffect(() => {
     
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
  
      if (success) {
        alert.success("Password Updated Successfully !");
  
        navigate("/login");

      }
    }, [dispatch, error, alert, success]);
  return (
    <>
     {loading?<Loader />:
    <>
    <MetaData title="Update Password" />
      <div className="resetPasswordContainer">
        <div className="resetPasswordBox">
            <h3>Update Password</h3>
          <form
            className="resetPasswordForm"
            onSubmit={resetPasswordSubmit}
           
          >
             
            <div className="loginPassword">
              <RiLockPasswordLine />
              <input
                type="password"
                required
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <input value="Change Password" type="submit" className="resetPasswordBtn" />
          </form>
        </div>
      </div>
    </>}</>
  )
}


export default ResetPassword