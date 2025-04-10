import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Box, Stack, TextField } from "@mui/material";
import styles from "./login.module.css";
import { useState, useEffect } from "react";
import { login } from "../../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";

export default function BasicCard() {
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [submitLogin, setSubmitLogin] = useState("");
  const navigate = useNavigate();

  const handleEventUsername = (e) => {
    setEmail(e.target.value);
  };

  const handleEventPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEventLogin = async () => {
    try {
      console.log("click");
      const result = await login({ email: email, password: password });
      localStorage.setItem("token", result.token);
      navigate("/");
      enqueueSnackbar("Logged In successfully", { variant: "success" });

      console.log("localstorage", localStorage.getItem("token"));
    } catch (e) {
      console.log(e);
      enqueueSnackbar(e?.response?.data?.message||e?.message + "Internal Server Error", { variant: "error" });
    }
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    // Handle successful login here
    navigate("/");
  };

  const handleGoogleLoginFailure = (error) => {
    console.log(error);
    // Handle login failure here
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
      minWidth="auto"
    >
      <Box className={styles.content} mt={0}>
        <Stack spacing={2} className={styles.form} bgcolor={""}>
          <h2 className={styles.title}>Login</h2>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            title="Email"
            name="email"
            placeholder="Enter Email"
            // sx={{ mb: 4 }}
            fullWidth
            onChange={handleEventUsername}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={handleEventPassword}
          />
          <Button sx={{ mb: 2 }} variant="contained" onClick={handleEventLogin}>
            Login
          </Button>
          <p className="secondary-action">
            Don’t have an account?{" "}
            <Link className="link" to="/register">
              Register now
            </Link>
          </p>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
          />
        </Stack>
      </Box>
    </Box>
  );
}
