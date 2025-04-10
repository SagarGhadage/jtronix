import React, { useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate, Link, Navigate } from "react-router-dom";
import styles from "./Register.module.css";
import { GoogleLogin } from "@react-oauth/google";
import { useSnackbar } from "notistack";
import pick from "../../../utils/pick";
import { signUp } from "../../../api/api";
export default function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [registerForm, setRegisterForm] = useState({
    email: "",
    lastname: "",
    firstname: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [circle, setCircle] = useState(false);

  const handleRegForm = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegisterSuccess = (response) => {
    console.log("Register Success:", response);
    navigate("/");
  };

  const handleRegisterFailure = (error) => {
    console.error("Register Failed:", error);
  };

  const register = async (formData) => {
    if (validateInput(formData)) {
      try {
        const newFormData = pick(formData, [
          "firstname",
          "lastname",
          "email",
          "address",
          "password",
        ]);
        setCircle(true);
        const data = await signUp(newFormData);
        console.log(data);
        if (data?.code) {
          enqueueSnackbar(data?.message, { variant: "error" });
        }
        if (data?.tokens&&data?.user) {
          enqueueSnackbar("Registered successfully", { variant: "success" });

          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) {
          enqueueSnackbar(err?.response?.data?.message||err?.message, { variant: "error" });
        } else {
          enqueueSnackbar(
            "Something went wrong. Check that the backend is running, reachable and returns valid JSON.",
            { variant: "error" }
          );
        }
      } finally {
        setCircle(false);
      }
    }
  };
  const validateInput = (data) => {
    console.log("validating", data);
    if (data?.firstname == "") {
      enqueueSnackbar("First name is a required field", { variant: "warning" });
      return false;
    }
    if (data.lastname == "") {
      enqueueSnackbar("Last name is a required field", { variant: "warning" });
      return false;
    }
    // if (data) {
    //   console.log("email.length>6:false")
    //   enqueueSnackbar("email must be at least 6 characters", { variant: "warning" })
    //   return false;
    // }
    if (data.email == "") {
      enqueueSnackbar("Email is a required field", { variant: "warning" });
      return false;
    }
    console.log("email :true");

    console.log("username.length>6:true");
    if (data.password == "") {
      enqueueSnackbar("Password is a required field", { variant: "warning" });
      return false;
    }
    console.log("password:true");
    if (data.password.length < 6) {
      console.log("password.length>6:false");
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "warning",
      });
      return false;
    }
    console.log("password.len>6:true");
    if (data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "warning" });
      return false;
    }
    console.log("confirmPass:true");
    return true;
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
          <h2 className={styles.title}>Register</h2>
          <TextField
            id="firstname"
            label="First name"
            variant="outlined"
            title="firstname"
            name="firstname"
            placeholder="Enter first name"
            fullWidth
            onChange={handleRegForm}
          />
          <TextField
            id="lastname"
            label="Last name"
            variant="outlined"
            title="lastname"
            name="lastname"
            placeholder="Enter Last Name"
            fullWidth
            onChange={handleRegForm}
          />
          <TextField
            id="address"
            label="Address"
            variant="outlined"
            title="address"
            name="address"
            placeholder="Enter Address"
            fullWidth
            onChange={handleRegForm}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            title="Email"
            name="email"
            placeholder="Enter Email"
            fullWidth
            onChange={handleRegForm}
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
            onChange={handleRegForm}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={handleRegForm}
          />
          {circle ? (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          ) : (
            <Button
              type="submit"
              className="button"
              variant="contained"
              onClick={async (e) => {
                e.preventDefault();
                const result = await register(registerForm);
                console.log(registerForm);
                // console.log(postResponse);
              }}
            >
              SignUp
            </Button>
          )}

          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
          {/* <Button
            type=""
            className="button"
            variant="contained"
            onClick={(e) => {
              console.log(e.target);
            }}
          >
            SignUp with Google
          </Button> */}
          <GoogleLogin
            text="signup_with"
            onSuccess={handleRegisterSuccess}
            onError={handleRegisterFailure}
          />
        </Stack>
      </Box>
    </Box>
  );
}
