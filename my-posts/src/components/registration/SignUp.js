import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SIGNIN } from "../../constants/constants";
import SnackbarMessage from "../Snackbar";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        isEmailVerify: false,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setError("");
          navigate(`/${SIGNIN}`);
        }
        return res.json();
      })
      .then((res) => {
        setError(res.message);
      })
      .catch(() => {
        setError("Something went wrong.");
      })
      .then(() => {
        setTimeout(() => {
          setError(null);
        }, 2000);
      });
  };

  return (
    <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value.trim());
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => {
            setPassword(e.target.value.trim());
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            email.length < 6 ||
            password.length < 6 ||
            password !== confirmPassword
          }
          onClick={signup}
        >
          Sign Up
        </Button>
      </DialogActions>
      <DialogActions>
        <a href={`/${SIGNIN}`}> Sign In </a>
      </DialogActions>
      {!!error && <SnackbarMessage message={error} />}
    </Dialog>
  );
};

export default SignUp;
