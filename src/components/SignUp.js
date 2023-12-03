import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLoading } from '../context/loadingContext';
import Loading from './Loading';
import useAlert from '../hooks/useAlert';
import { useNavigate } from 'react-router-dom';


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const { loading, setLoading } = useLoading();
    const { setAlert } = useAlert();;
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        setLoading(true)
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            emailId: data.get('email'),
            phoneNumber: data.get('mobileNumber'),
            userType: "STUDENT",
            userId: data.get('userid'),
            password: data.get('password'),
            rePassword: data.get('retype-password'),
        }
        try {
            const response = await fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/signUp', {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })

            if (response.ok) {
                setAlert('Signup success!', 'success')
                navigate('/admin');
            } else {
                setAlert('Something went wrong', 'error')
                // Handle unsuccessful login
                console.error('Login failed');
            }

        } catch (error) {
            console.error('An error occurred during signup:', error);
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
                    <Avatar alt='Pathshalo' src={require("../assets/images/pathshala.jpg")} sx={{ width: 156, height: 156 }} variant="square" />
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="mobileNumber"
                                    label="Mobile Number"
                                    name="mobileNumber"
                                    autoComplete="mobileNumber"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="userid"
                                    label="User Id"
                                    name="userid"
                                    autoComplete="userid"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="retype-password"
                                    label="Retype Password"
                                    type="retype-password"
                                    id="retype-password"
                                    autoComplete="new-retype-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}