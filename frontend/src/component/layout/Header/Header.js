import React, { useState } from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../../src/images/logo.png";
import { MdAccountCircle } from "react-icons/md";
import { MdSearch } from "react-icons/md";
import { AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FaStoreAlt } from "react-icons/fa";
 import "./header.css";
import { TbArrowRoundaboutRight } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";


// const options = {
//     burgerColor:"#f0eef2",
//     burgerColorHover: "#fede00",
//     logo,
//     logoWidth: "17vmax",
//     logoHoverColor:"white",
//     navColor1: "white",
//     /*navColor2: "yellow",
//     navColor3: "blue",
//     navColor4: "brown",*/
//     link1Text: "Home",
//     link2Text: "Products",
//     link3Text: "Contact",
//     link4Text: "About",
//     link1Url: "/home",
//     link2Url: "/products",
//     link3Url: "/contact",
//     link4Url: "/about",
//     link1Size: "1.6vmax",
//     link1Color: "#011c4b",
//     nav1justifyContent: "center",
//     nav2justifyContent: "center",
//     nav3justifyContent: "center",
//     nav4justifyContent: "center",
//     link1ColorHover: "#eb4034",
//     link1Margin: "1vmax",
//     profileIcon:true,
//     profileIconColor: "#011c4b",
//     ProfileIconElement: MdAccountCircle,
//     searchIcon:true,
//     searchIconColor: "#011c4b",
//     SearchIconElement:MdSearch,
//     cartIcon:true,
//     cartIconColor: "#011c4b",
//     CartIconElement:AiOutlineShoppingCart,
//     profileIconUrl: "/login",

//   profileIconColorHover: "#eb4034",
//   searchIconColorHover: "#eb4034",
//   cartIconColorHover: "#eb4034",
//   cartIconMargin: "1vmax",
//   };

// const Header = () => {
//   return (
//     <ReactNavbar {...options} />
//   )
// }

// export default Header

const Header = () => {
   const[isActive,setActive]=useState("false");
  const handleToggle=()=>{
   setActive(!isActive);
  }
  return (
    <>
      <div className="nav-main">
        <div className="navbar">
          <Link to="/" className="nav-head">
            <h3>
              <TfiShoppingCartFull />
              CartiQue
            </h3>
          </Link>
          <span onClick={handleToggle} className={isActive?"bars":"bars hide"}><FaBars /></span>
          </div>
         
         <div className={isActive? "navMenu hide":"navMenu"}>
          <span onClick={handleToggle}className="closeNav"><RxCross2/></span>
          
          <ul className="nav-ul">
            <li>
              <a href="/">
                <AiOutlineHome />
                Home
              </a>
            </li>
            <li>
              <a href="/products">
                <FaStoreAlt />
                Products
              </a>
            </li>
            <li>
              <a href="/search">
                <MdSearch />
                Search
              </a>
            </li>
            <li>
              <a href="/login">
                <MdAccountCircle />
                Profile
              </a>
            </li>
            <li>
              <a href="/cart">
                <AiOutlineShoppingCart />
                Cart
              </a>
            </li>
            {/* <li>
              <a href="/">
                <TbArrowRoundaboutRight />
                About
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
