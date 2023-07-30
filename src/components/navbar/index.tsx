import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import styled from "styled-components";
import './index.css'


export const Navbar = () => {
  const navigate = useNavigate();
  const Logout = ()=>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <>
      <Box sx={{
        padding: '20px',
        border: '1px solid #cecece'
      }}>
        <Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <img src='../../../public/TT-Logo.png' alt='Turing Technologies' height={30}></img>
            <Button className='logout-btn' onClick={Logout} variant="outlined" >Log out</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
