import React, { useState } from 'react';
import { AppBar, Toolbar, Avatar, Button, Paper, Grid, Typography, Container, IconButton } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Input from './Input';
import Swal from 'sweetalert2'
import './Auth.css'


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
// const URL = 'https://pdf-manager-s3-v2.onrender.com';
const URL = 'http://localhost:5000';

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log(form)
    if (!isSignup) {
      await axios.post(`${URL}/signin`, form, { headers: { 'Content-Type': 'application/json' } })
        .then((res) => {
          console.log(res.data);
          localStorage.setItem('token', res.data.token);
          history.push('/');
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: "Invalid Credentials",
            icon: 'error',
            confirmButtonColor: 'rgb(25,118,210)',
            confirmButtonText: 'Cool'
          })
        })
    }
    else {
      if (form.password !== form.confirmPassword) {
        Swal.fire({
          title: 'Error!',
          text: "Passwords doesn't match",
          icon: 'error',
          confirmButtonColor: 'rgb(25,118,210)',
          confirmButtonText: 'Cool'
        })
      }
      else {
        await axios.post(`${URL}/signup`, form, { headers: { 'Content-Type': 'application/json' } })
          .then((res) => {
            console.log(res.data);
            localStorage.setItem('token', res.data.token);
            history.push('/');
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: 'Error!',
              text: "User already exist",
              icon: 'error',
              confirmButtonColor: 'rgb(25,118,210)',
              confirmButtonText: 'Cool'
            })
          })

      }
    }


  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleBackButtonClick = () => {
    history.push('/');
  };

  return (
    <>
      <div className="navbar">
        <IconButton onClick={handleBackButtonClick}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" className="navbar-title" sx={{ display: 'flex', margin: 'auto', color: 'white' }}>
          PDF-manager
        </Typography>
      </div>
      {!localStorage.getItem('token') && <Container component="main" maxWidth="xs" className="container">
        <Paper elevation={3} className="paper">
          <Avatar className="avatar">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '1.2rem 0rem' }}>
            {isSignup ? 'Sign up' : 'Sign in'}
          </Typography>
          <form onSubmit={handleSubmit} className="form">
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className="submit-btn">
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Button className="link" onClick={switchMode}>
                  {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>}
      {localStorage.getItem('token') && <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'centre', fontSize: '2rem' }}> Already loged in</Container>}
    </>
  );
};

export default Auth;

