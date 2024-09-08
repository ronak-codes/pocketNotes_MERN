import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { config } from '../config/config';
import { useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import { validateEmail } from '../utils/commonFunctions';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        pocketNotes
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();


  window.addEventListener('popstate', () => {
    window.location.href = '/signin';
});


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(data.get("email").length == 0 || data.get("password").length==0){
        toast.error("Enter all the inputs");
        return;
    }

    if(!validateEmail(data.get("email"))){
      toast.error("Please enter valid email address !");
      return;
    }


    let reqBody={
      email:data.get("email"),
      password:data.get("password")
    }
    const result = await axios.post(config.BASE_URL+"/api/user/signInUser",reqBody)
    console.log("result is",result);
    if(result.data.statusCheck=="success"){
      localStorage.setItem("userId",result.data.userId);
      navigate("/home");
    }else{
      toast.error(" Please Enter correct details!!");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <ToastContainer />
      </Container>
    </ThemeProvider>
  );
}