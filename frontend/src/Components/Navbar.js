import React, { Component } from 'react';
import '../css/Navbar.css'
import { Link } from "react-scroll";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Navbar extends Component{

  //State
  state={
    showMobileNav: false,
  }

  //Functions
  mobileNavClick = () => {
    this.setState({
      showMobileNav: !this.state.showMobileNav
    });
  }

  render(){
    return (
      <div className="navbar">
        <div className="navContainer">
          <p className="navLogo">Faiq Ahmed</p>

          {/*the class name only effects the mobile menu, that is why only the class name is changed rather than removing it from DOM.
          We still want it displayed on non-mobile menu regardless of whether the button has been clicked or not*/}
          <nav className={this.state.showMobileNav? "nav-inactive": ""}>
            <ul className="navbarLinks">
              <li>
                <Link to="projects" smooth={true} offset={-80} duration={500} style={{cursor: 'pointer'}}>Projects</Link>
              </li>
              <li>
                <Link to="workExperience" smooth={true} offset={-80} duration={500} style={{cursor: 'pointer'}}>Work Experience</Link>
              </li>
              <li>
                <a href="https://github.com/fahmed8383?tab=repositories" rel="noopener noreferrer" target="_blank">GitHub</a>
              </li>
              <li className="navButtonMobileLi">
                <Link className="navButton" to="contactForm" smooth={true} offset={20} duration={500}>Contact</Link>
              </li>
            </ul>
          </nav>
          <div className="mobileMenu" id="mobileMenu"><FontAwesomeIcon icon={this.state.showMobileNav? faTimes : faBars} onClick={this.mobileNavClick}></FontAwesomeIcon></div>
          <div className="navButtonDiv">
            <Link className="navButton" to="contactForm" smooth={true} offset={20} duration={500}>Contact</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;
