import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLoading } from '../context/loadingContext';
import Loading from './Loading';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import { USER_TYPES } from "../constants";
import { UserContext } from "../context/user/user.context";
import { useForm } from "react-hook-form";

const defaultTheme = createTheme();

export default function SignIn(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { loading, setLoading } = useLoading();
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const { changeUser } = React.useContext(UserContext);

  const handleSignInSubmit = async (formData) => {
    var body = {
      userId: formData.userid,
      password: formData.password,
      ip: ""
    };

    setLoading(true);

    try {
      await fetch("https://api.ipify.org/?format=json")
        .then((response) => response.json())
        .then((data) => (body.ip = data.ip));

      const response = await fetch(
        "https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        setAlert('Login success!', 'success')
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data));
        let auth = {};
        auth.loggedInUserId = data.userId;
        auth.userType = data.userType;
        auth.token = data.token;
        localStorage.setItem('auth', JSON.stringify(auth));
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('token', data.token);
        if (data.userType === USER_TYPES.ADMIN) {
          changeUser(data);
          navigate("/admin");
        } else if (data.userType === USER_TYPES.INSTRUCTOR) {
          changeUser(data);
          navigate(`/instructor`);
        } else if (data.userType === USER_TYPES.STUDENT) {
          changeUser(data);
          navigate(`/student`);
        }
      } else {
        setAlert('Invalid Credentials', 'error')
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {loading && <Loading />}
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
          <Avatar
            alt='Pathshala'
            src={require("../assets/images/pathshala.jpg")}
            sx={{ width: 200, height: 200 }}
            variant="square"
          />
          <Typography component="h1" variant="h5" sx={{ color: "#d32f2f" }}>
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(handleSignInSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userid"
              label="User ID"
              name="userid"
              type='userid'
              autoFocus
              {...register("userid", { required: "User Id is required" })}
              error={!!errors.userid}
              helperText={errors.userid?.message}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Link href="/signup" variant="body2" sx={{ color: "#d32f2f" }}>
              {"Don't have an account? Sign Up"}
            </Link>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#d32f2f", color: "#ffffff" }}
            >
              Sign In
            </Button>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
