import React from "react";

import "./landingPage.css";
import Navbar from "../../components/Navbar";
import Hero from "../../components/hero";
import About from "../../components/About";
import News from "../../components/News";
import Contact from "../../components/Contact";
import LoginModal from "../../components/LoginModal";
 import SignupModal from "../../components/SignupModal";
import MainFooter from "../../components/mainFooter";



const LandingPage = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <About/>
    <News/>
    <Contact/>
    <LoginModal/>
    <SignupModal/>
    <MainFooter/>
  

    
    

    </>
  );
};

export default LandingPage;
