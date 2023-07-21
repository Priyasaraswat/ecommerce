import React from 'react'
import Appstore from "../../../../src/images/Appstore.png"
import playstore from "../../../../src/images/playstore.png";
import linkedin from "../../../../src/images/linkedin.png"
import insta from "../../../../src/images/insta.png";
import "./footer.css"

const Footer = () => {
  return (
    <div className="footer">

        <div className='leftSide'>
          <h2>DOWNLOAD OUR APP</h2>
          <p>Download App for Android and IOS mobile phone</p>
          <img src={Appstore} className="img-footer"></img>
          <img src={playstore} className="img-footer"></img>
        </div>

        <div className='midSide'>
           <h3>Take It</h3>
           <p>Developed By <span>Priya & Shreya</span></p>
           <p>2023 All Rights Reserved &copy; </p>
           
        </div>

        <div className='rightSide'>
           <h3>Follow Us</h3>
           <a href="https://www.linkedin.com/in/priya-saraswat766/" target="_blank"><img src={linkedin} className="img-footer-logo"></img></a>
           <a href="" target="_blank"><img src={insta} className="img-footer-logo"></img></a>
        </div>
    

    </div>
  )
}

export default Footer