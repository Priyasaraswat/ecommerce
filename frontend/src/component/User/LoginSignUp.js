import React, { useEffect, useRef, useState } from "react";
import { FiMail } from "react-icons/fi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";
import { RxFace } from "react-icons/rx";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, login,register} from "../../Actions/UserAction";
import {useAlert} from "react-alert";
import Loader from "../layout/Loader/Loader";
import profile from "./profile.png";


const LoginSignUp = () => {
  const dispatch=useDispatch();
  const alert= useAlert();
  const navigate=useNavigate();
  const location=useLocation();
  const {error,loading,isAuthenticated}=useSelector(state=>state.user)

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switchTabs = useRef();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const[user,setUser]=useState({
    name:"",
    email:"",
    password:""
  });
  const {name,email,password}=user;

  const [avatar,setAvatar]=useState("/profile.png");
  const [avatarPreview,setAvatarPreview]=useState("/profile.png");

  const redirect = location.search ? location.search.split("=")[1] : "/account";
 
  useEffect(()=>{
     if(error){
      alert.error(error);
      dispatch(clearErrors());
     }

     if(isAuthenticated)
     {
      navigate(redirect)
     }
  },[dispatch,error,alert,isAuthenticated,redirect,navigate])
  const switchBtw = (e, tab) => {
    if (tab === "login") {
      switchTabs.current.classList.add("shiftToNeutral");
      switchTabs.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    } else {
      switchTabs.current.classList.remove("shiftToNeutral");
      switchTabs.current.classList.add("shiftToRight");
      
      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
  };
  const registerSubmit =(e)=>{

    e.preventDefault();
    const myForm =new FormData();
    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    dispatch(register(myForm));
    }

  const registerDataChange =(e)=>{
    if(e.target.name==="avatar"){
    const reader=new FileReader();

    reader.onload=()=>{
      if(reader.readyState===2){
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    }
    reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setUser({...user,[e.target.name]:e.target.value})
    }
  }
  return (
    <>
     {loading?<Loader />: <div className="loginSignupContainer">
        <div className="loginSignupBox">
          <div>
            <div className="loginSignuptoggle">
              <p onClick={(e) => switchBtw(e, "login")}>Login</p>
              <p onClick={(e) => switchBtw(e, "register")}>Register</p>
            </div>
            <button ref={switchTabs}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <FiMail />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              ></input>
            </div>
            <div className="loginPassword">
              <RiLockPasswordLine />
              <input
                type="password"
                required
                placeholder="Password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              ></input>
            </div>
            <Link to="/password/forgot">Forget Password?</Link>
            <input type="submit" className="loginBtn" value="Login" />
          </form>

          <form
            className="signUpForm"
            ref={registerTab}
            onSubmit={registerSubmit}
            encType="multipart/form-data"
          >
            <div className="signUpName">
              <RxFace />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              ></input>
            </div>

            <div className="signUpEmail">
              <FiMail />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              ></input>
            </div>
            <div className="signUpPassword">
              <RiLockPasswordLine />
              <input
                type="password"
                required
                placeholder="Password"
                name="password"
                value={password}
                onChange={registerDataChange}
              ></input>
            </div>
            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar"></img>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              ></input>
            </div>
            <input
              value="Register"
              type="submit"
              className="signUpBtn"
            />
          </form>
        </div>
      </div>}
    </>
  );
};

export default LoginSignUp;
