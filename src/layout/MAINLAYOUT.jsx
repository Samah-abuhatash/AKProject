import React from 'react'
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';

function MAINLAYOUT() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>

  )
}

export default MAINLAYOUT ;