import React from 'react'
import playStore from '../../../images/playstore.png';
import appStore from '../../../images/appstore.png';
import './Footer.css';
const Footer = () => {
  return (
    <footer id='footer'>
        <div className="leftFooter">
            <h4>Download our app</h4>
            <p>Download App for Android and ios mobile phone.</p>
            <img src={playStore} alt='playStore'/>
            <img src={appStore} alt='appStore'/>
        </div>
        <div className="midFooter">
            <h1>ECOMMERCE</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ipsam.</p>

        </div>
        <div className="rightFooter">  
            <h4>Follow us On</h4>
            <a href="https://www.facebook.com/">Facebook</a>
            <a href="https://www.instagram.com/">Instagram</a>
            <a href="https://www.youtube.com/">Youtube</a>
        </div>
    </footer>
  )
};

export default Footer
