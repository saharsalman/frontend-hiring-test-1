//lib
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { CircularProgress, InputAdornment, Stack, Typography } from '@mui/material';
import { TextField, Button, Box } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import styled from "styled-components";
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { LoginApi } from '../../services/loginApi';
import './index.css'
import logoImage from '../../assets/images/logo-image.png'

const LoginStyled = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  form {
    width: 400px;
    background-color: #FFFFFF;
    padding: 4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2em;
    .input-fields{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2em;
        width: 100%;
    }
  }
`;


export const Login = () =>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handlePass = () => {
        setShowPass(!showPass);
    }

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            const response = await LoginApi(data);
            localStorage.setItem('jwtToken',response.access_token);
            setLoading(false);
            navigate('/home')
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (
        <>
            <Box sx={{ backgroundColor:'#f4eeee'}}>
                <LoginStyled>
                <Stack sx={{     
                        padding: '13px',
                        paddingLeft: '50px',
                        alignItems: 'flex-start',
                        backgroundColor: 'white ',
                        position: 'absolute',
                        top: '0',
                        width: '-webkit-fill-available'
                    }}>
                        <div>
                            <img height='30px' src={logoImage} alt='' />
                        </div>
                </Stack>
                    <form style={{padding: '34px', borderRadius:'8px'}} onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{width: '100%', height: '100%', display: 'flex' ,gap: '24px', flexDirection: 'column'}}>
                            <Stack  spacing={2}>
                                <Typography sx={{textAlign: 'left', fontFamily: 'AvenirLTStd-black'}}><span style={{color: 'red'}}>* </span>User Name</Typography>
                                <TextField
                                    id="username"
                                    placeholder="Email"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PersonOutlineOutlinedIcon fontSize='small' />
                                            </InputAdornment>
                                            ),
                                        }}
                                    fullWidth
                                    {...register('username', { required: 'Username is required' })}
                                    error={errors.email ? true : false}
                                    />
                            </Stack>
                            <Stack spacing={2}>
                            <Typography sx={{textAlign: 'left', fontFamily: 'AvenirLTStd-black'}}><span style={{color: 'red'}}>* </span>Password</Typography>
                            <TextField
                            id="password"
                            placeholder="Password"
                            type={!showPass ? "password" : 'text'}
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon fontSize='small' />
                                    </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            {
                                                !showPass ?
                                                    <VisibilityOutlinedIcon fontSize='small' sx={{cursor:'pointer'}} onClick={() => handlePass()} /> :
                                                    <VisibilityOffOutlinedIcon fontSize='small' sx={{cursor:'pointer'}}  onClick={() => handlePass()} />
                                            }
                                        </InputAdornment>
                                    )
                                }}
                            fullWidth
                            {...register('password', { required: 'Password is required' })}
                            error={errors.password ? true : false}
                            />
                            </Stack>
                        </Box>
                        <Stack sx={{    width: '100%'}}>
                            <Button sx={{    width: '100px'}} type="submit" variant="contained" color="primary">
                                {
                                    loading ?
                                        <CircularProgress sx={{color: 'white'}} size={25} /> :
                                        <span style={{ textTransform: 'initial' }}>Log in</span>
                                }
                            </Button>
                        </Stack>
                    </form>
                </LoginStyled>
            </Box>
        </>
  );
}