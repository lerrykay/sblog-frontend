import React from "react";

import "./LandingPage.css";
import Navbar from "../../components/Navbar";
import About from "../../components/About";
import News from "../../components/News";
import Contact from "../../components/Contact";
import LoginModal from "../../components/LoginModal";
 import SignupModal from "../../components/SignupModal";
import MainFooter from "../../components/MainFooter";
import Hero from "../../components/Hero";




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
