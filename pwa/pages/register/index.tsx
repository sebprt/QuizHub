import Head from "next/head";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";

const Register = () => {
  const axios = require("axios");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => {
    axios({
      method: "post",
      url: "/users",
      data: data,
    })
      .then(function (response) {
        toast.success("User created !", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch(function (error) {
        toast.error(
          "Impossible to create an user !" +
            error.response.data["hydra:description"],
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
        <title>QuizHub | Register</title>
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
            <Typography variant="h1">Register</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Firstname"
                size="small"
                {...register("firstname", { required: true })}
                margin="normal"
                helperText={
                  errors.firstname &&
                  errors.firstname?.type === "required" &&
                  "First name is required"
                }
                error={
                  errors.firstname && errors.firstname?.type === "required"
                }
                fullWidth
              />

              <TextField
                label="Lastname"
                size="small"
                {...register("lastname", { required: true })}
                helperText={
                  errors.lastname &&
                  errors.lastname?.type === "required" &&
                  "Last name is required"
                }
                error={errors.lastname && errors.lastname?.type === "required"}
                margin="normal"
                fullWidth
              />

              <TextField
                label="Username"
                size="small"
                {...register("username", { required: true })}
                margin="normal"
                helperText={
                  errors.username &&
                  errors.username?.type === "required" &&
                  "Username is required"
                }
                error={errors.username && errors.username?.type === "required"}
                fullWidth
              />

              <TextField
                label="Email"
                size="small"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                margin="normal"
                helperText={
                  (errors.email &&
                    errors.email?.type === "required" &&
                    "Email is required") ||
                  (errors.email &&
                    errors.email?.pattern !== "/^\\S+@\\S+$/i" &&
                    "Email is invalid")
                }
                error={
                  (errors.email && errors.email?.type === "required") ||
                  (errors.email && errors.email?.pattern !== "/^\\S+@\\S+$/i")
                }
                fullWidth
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: true, minLength: 8 }}
                render={({ field }) => (
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    helperText={
                      (errors.password &&
                        errors.password?.type === "required" &&
                        "Password is required") ||
                      (errors.password &&
                        errors.password?.type === "minLength" &&
                        "Password must be at least 8 characters long")
                    }
                    error={
                      (errors.password &&
                        errors.password?.type === "required") ||
                      (errors.password && errors.password?.type === "minLength")
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
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
              {errors.password !== errors.confirmPassword && (
                <span role="alert">Passwords doen't matches</span>
              )}

              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true, minLength: 8 }}
                render={({ field }) => (
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
                              <VisibilityOff />
                            ) : (
                              <Visibility />
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
                sx={{ marginY: 2 }}
                fullWidth
              >
                Register
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
