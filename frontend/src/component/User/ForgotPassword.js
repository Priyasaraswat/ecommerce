import React, { useEffect, useState } from "react";
import "./forgotPassword.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { loadUser, clearErrors, forgotPassword } from "../../Actions/UserAction";
import { FiMail } from "react-icons/fi";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  
  const { error, loading,message } = useSelector((state) => state.forgotPassword);
  const [email,setEmail]=useState("");
 
  const forgotPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
   
    myForm.set("email", email);
    
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
      dispatch(loadUser());

      
    }
  }, [dispatch, error, alert,message]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Forgot Password" />
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordBox">
              <h3>Forgot Password</h3>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <FiMail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>

                <input
                  value="Send"
                  type="submit"
                  className="forgotPasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgotPassword;
