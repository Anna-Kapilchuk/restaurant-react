import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { GOOGLE_AUTH_URL, LOGIN_URL, ME_URL, SIGN_UP_URL } from '../infra/urls';
import { SetNotificationContext } from '../restaurantContext/NotificationContext';
import { useNavigate } from 'react-router-dom';
import { SetUserContext } from '../restaurantContext/Context';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import HomeIcon from '@mui/icons-material/Home';

const LoginPage = () => {

  const defaultTheme = createTheme();

    const setUser = React.useContext(SetUserContext)
    const setNotification = React.useContext(SetNotificationContext)
    const navigate = useNavigate()

    const [email, setEmail] = React.useState()
    const [password, setPassword] = React.useState()



    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
          const response = 
              await axios.post(LOGIN_URL, {username: email, password: password})
            localStorage.setItem('token' , response.data.access)

            const meResponse = await axios.get(ME_URL,)
            setUser({
                user: {...meResponse.data}
            })
            navigate('/')
            setNotification({open: true, msg: 'You have successfully logged in', severity: 'success'})

          } catch (e) {
          console.log(e)
          setNotification({open: true, msg: e.response.data.detail, severity: 'error'})
        }    
    };

  return (
    <GoogleOAuthProvider clientId="582224161241-pcdsbikpfg3111ft3hi4q8ivtr6s1c4r.apps.googleusercontent.com">
      <button onClick={() => navigate('/')}>
            <HomeIcon/>
      </button>
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
            <GoogleLogin
            onSuccess={async (credentialResponse) => {
              console.log(credentialResponse);
              const response = await axios.post(
                GOOGLE_AUTH_URL, 
                {google_jwt: credentialResponse.credential})

                localStorage.setItem('token' , response.data.access)

                const meResponse = await axios.get(ME_URL,)
                setUser({
                    user: {...meResponse.data}
                })
                navigate('/')
                setNotification({open: true, msg: 'You have successfully logged in', severity: 'success'})
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
          />
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://storage.googleapis.com/restaurant-jb/arabic-feast-scaled.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default LoginPage