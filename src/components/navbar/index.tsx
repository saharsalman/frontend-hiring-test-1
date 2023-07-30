import React from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router';
import styled from "styled-components";
import './index.css'

import logoImage from '../../assets/images/logo-image.png'


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
            <div>
              <img height='30px' src={logoImage} alt='' />
            </div>
            <Button className='logout-btn' onClick={Logout} variant="outlined" >Log out</Button>
          </Box>
        </Box>
      </Box>
    </>
  )
}
