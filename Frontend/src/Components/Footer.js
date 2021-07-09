import React from "react";
import "../App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import fbImage from '../Images/Social/facebook.svg'
import instaImage from '../Images/Social/instagram.svg'
import twitterImage from '../Images/Social/twitter.svg'
import emailImage from '../Images/Social/email.svg'
import devImage from '../Images/Social/developer2.svg'
import reportImage from '../Images/Social/report.svg'

export default function Footer() {
  return (
    <footer className="footer">
      <span className="logo">Mangosite</span>

      <div className="footerText">
        <span>Explore</span>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/">Categories</a></li>
          <li><a href="/about-us">About</a></li>
        </ul>
      </div>

      <div className="footerText">
        <span>Follow</span>
        <ul>
          <Router>
            <li>
              <Link to="#">
                <img src={fbImage} alt="fb" /> Facebook
              </Link>
            </li>
            <li>
              <Link to="#">
                <img
                  src={instaImage}
                  style={{ backgroundColor: "white", borderRadius: "6px" }}
                  alt="instagram"
                />{" "}Instagram
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={twitterImage} alt="twitter" /> Twitter
              </Link>
            </li>
          </Router>
        </ul>
      </div>

      <div className="footerText">
        <span>Contact</span>
        <ul>
          <Router>
            <li>
              <Link to="#">
                <img src={emailImage} alt="email" /> E-mail
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={devImage} alt="dev" /> Developer
              </Link>
            </li>
            <li>
              <Link to="#">
                <img src={reportImage} alt="report" /> Report
              </Link>
            </li>
          </Router>
        </ul>
      </div>

      <div className="copyright">
        <span>&#xa9; 2021 mangosite.com. All Rights Reserved.</span>
      </div>
    </footer>
  );
}
