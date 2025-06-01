import React from 'react'
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';
import { Container } from '@mui/material';

function MAINLAYOUT() {
  return (
    <>
    <Navbar/>
    <Container>
    <Outlet/>
    </Container>

    <Footer/>
    </>

  )
}

export default MAINLAYOUT ;