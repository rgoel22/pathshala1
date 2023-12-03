import * as React from 'react';
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
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import useAlert from '../hooks/useAlert';
import { USER_TYPES } from "../constants";
import { UserContext } from "../context/user/user.context";
const defaultTheme = createTheme();

export default function SignIn(props) {
    const { loading, setLoading } = useLoading();
    const { setAlert } = useAlert();
    const navigate = useNavigate(); // Get the navigate function
    const { changeUser } = React.useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            userId: data.get('userid'),
            password: data.get('password'),
        };
        
        setLoading(true);

    try {
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
              if (data.userType === USER_TYPES.ADMIN) {
                changeUser(data);
                navigate("/admin");
              } else if (data.userType === USER_TYPES.INSTRUCTOR) {
                changeUser(data);
                navigate(`/instructor/${data.userId}`);
              } else if (data.userType === USER_TYPES.STUDENT) {
                changeUser(data);
              }
            } else {
                // Handle unsuccessful login
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} />
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userid"
              label="User ID"
              name="userid"
              autoComplete="userid"
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
            <Link href="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
