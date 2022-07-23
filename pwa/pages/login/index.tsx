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

        localStorage.setItem("token", response.data.token);

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
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Head>
        <title>QuizHub | Login</title>
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
            <Typography variant="h1">Login</Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
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

              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
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

              <Button
                variant="contained"
                type="submit"
                sx={{ marginY: 2 }}
                fullWidth
              >
                Login
              </Button>
            </form>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Register;
