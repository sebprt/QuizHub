import Head from "next/head";
import React, {useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Box, Button, Container, IconButton, InputAdornment, TextField, Typography,} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {toast} from "react-toastify";

const Register = () => {
    const axios = require("axios");

    const {
        handleSubmit,
        control,
        formState: {errors},
        watch
    } = useForm();
    const onSubmit = (data) => {
        axios({
            method: "post",
            url: "/authentication_token",
            data: data,
        })
            .then(function (response) {
                console.log(response.data);
                toast.success("Login sucessfull !", {
                    position: toast.POSITION.TOP_CENTER,
                });

                window.location.replace("/");
            })
            .catch(function (error) {
                toast.error(
                    "Impossible to log in !" + error.response.data["hydra:description"],
                    {
                        position: toast.POSITION.TOP_CENTER,
                    }
                );
            });
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <>
            <Head>
                <title>QuizHub | Reset password</title>
            </Head>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "auto",
                    minHeight: "100vh",
                }}
            >
                <Container maxWidth="sm">
                    <Box>
                        <Typography variant="h1">Reset your password</Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Controller
                                name="password"
                                control={control}
                                rules={{required: true}}
                                render={({field}) => (
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type={showPassword ? "text" : "password"}
                                        helperText={
                                            errors.password &&
                                            errors.password?.type === "required" &&
                                            "Password is required"
                                        }
                                        error={
                                            errors.password && errors.password?.type === "required"
                                        }
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        size="small"
                                        {...field}
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />

                            <Controller
                                name="confirmPassword"
                                control={control}
                                rules={{required: true, minLength: 8}}
                                render={({field}) => (
                                    <TextField
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        label="Confirm Password"
                                        helperText={
                                            (errors.confirmPassword &&
                                                errors.confirmPassword?.type === "required" &&
                                                "Password is required") ||
                                            (errors.confirmPassword &&
                                                errors.confirmPassword?.type === "minLength" &&
                                                "Password must be at least 8 characters long") ||
                                            (watch("confirmPassword") !== watch("password") &&
                                                "Passwords doesn't matches")
                                        }
                                        error={
                                            (errors.confirmPassword &&
                                                errors.confirmPassword?.type === "required") ||
                                            (errors.confirmPassword &&
                                                errors.confirmPassword?.type === "minLength") ||
                                            watch("confirmPassword") !== watch("password")
                                        }
                                        type={showConfirmPassword ? "text" : "password"}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowConfirmPassword}
                                                        edge="end"
                                                    >
                                                        {showConfirmPassword ? (
                                                            <VisibilityOff/>
                                                        ) : (
                                                            <Visibility/>
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                        size="small"
                                        {...field}
                                        margin="normal"
                                        fullWidth
                                    />
                                )}
                            />

                            <Button
                                variant="contained"
                                type="submit"
                                sx={{marginY: 2}}
                                fullWidth
                            >
                                Reset
                            </Button>
                        </form>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Register;
