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
import { useForm } from "react-hook-form";


// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {
    const { loading, setLoading } = useLoading();
    const { setAlert } = useAlert();;
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleSignupSubmit = async (formData) => {
        setLoading(true)
        const body = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            emailId: formData.email,
            phoneNumber: formData.mobileNumber,
            userType: "STUDENT",
            userId: formData.userid,
            password: formData.password,
            rePassword: formData.retypePassword,
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
                    <form onSubmit={handleSubmit(handleSignupSubmit)} noValidate>
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
                                    {...register("firstName", { required: "First name is required" })}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
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
                                    {...register("lastName", { required: "Last name is required" })}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
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
                                    {...register("email", { required: "Email is required" })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
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
                                    type='number'
                                    maxlength="10"
                                    {...register("mobileNumber", { required: "Mobile Number is required" })}
                                    error={!!errors.mobileNumber}
                                    helperText={errors.mobileNumber?.message}
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
                                    {...register("userid", { required: "User Id is required" })}
                                    error={!!errors.userid}
                                    helperText={errors.userid?.message}
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
                                    {...register("password", { required: "Password is required" })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="retypePassword"
                                    label="Retype Password"
                                    type="retypePassword"
                                    id="retypePassword"
                                    autoComplete="new-retypePassword"
                                    {...register("retypePassword", { required: "Retype Password is required" })}
                                    error={!!errors.retypePassword}
                                    helperText={errors.retypePassword?.message}
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
                    </form>
                </Box>
            </Container>
        </ThemeProvider>
    );
}