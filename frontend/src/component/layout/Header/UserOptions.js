import React, { Fragment, useState } from 'react';
import { SpeedDial,SpeedDialAction } from '@mui/material';
import { MdOutlineDashboard } from "react-icons/md";
import { BiLogIn} from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { logOut } from '../../../Actions/UserAction';
import "./userOptions.css";
import Backdrop from "@material-ui/core/Backdrop";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";


const UserOptions = ({user}) => {
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const alert=useAlert();
    const { cartItems } = useSelector((state) => state.cart);
    const menu=[
        {
            icon:<MdOutlineShoppingCart style={{color:cartItems.length>0?"tomato":"unset"}} />,name:`Cart(${cartItems.length})`,func:cart
        },
       
        {
            icon:<IoPersonOutline />,name:"Profile",func:account
        },
        {
            icon:<MdOutlinePayment />,name:"Orders",func:orders
        },
        {
            icon:<BiLogIn/>,name:"Log Out",func:logOutUser
          },
]
if(user.role==="admin"){
   menu.unshift( {
       icon:<MdOutlineDashboard />,name:"Dashboard",func:dashboard
   },)
 }

function dashboard(){
    navigate("/admin/dashboard");
 }
function cart(){
    navigate("/cart");
}
function orders(){
   navigate("/orders")
}

function account(){
    navigate("/account")
}

function logOutUser(){
     dispatch(logOut());
    alert.success("LogOut Successfully !")
}
  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
     <SpeedDial
     ariaLabel="SpeedDial tooltip example"
     onClose={()=>setOpen(false)}
     onOpen={()=>setOpen(true)}
     open={open}
     direction="down"
     className='speedDial'
     icon={
        <img className='speedDialIcon'
             src={"/profile.png"}
             alt="Profile"
        />
     }
     >
        {menu.map((m)=>(
            <SpeedDialAction key={m.name} icon={m.icon} tooltipTitle={m.name} onClick={m.func} tooltipOpen={window.innerWidth<=600?true:false}/>
            ))}
        
     </SpeedDial>
    </Fragment>
  )
}

export default UserOptions