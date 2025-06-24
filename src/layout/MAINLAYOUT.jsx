import React from 'react'
import Navbar from '../components/navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/footer/Footer';
import { Container } from '@mui/material';
import Cartcontextprovider from '../components/context/Cartcontext';

function MAINLAYOUT() {
  return (
    <>
    <Cartcontextprovider>
       <Navbar/>
    <Container>
    <Outlet/>
    </Container>

    <Footer/>

    </Cartcontextprovider>
   
    </>

  )
}

export default MAINLAYOUT ;