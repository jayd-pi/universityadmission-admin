// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from "../header/Header";
import HeaderBottom from "../header/HeaderBottom";
import Footer from "../footer/Footer";
import Routes from "../../routers/Routers"


const Layout = () => {
  return (
    <>
      <Header/>
      <HeaderBottom/>
      <div>
        <Routes/>
      </div>
      <Footer/>
    </>
  )
}

export default Layout