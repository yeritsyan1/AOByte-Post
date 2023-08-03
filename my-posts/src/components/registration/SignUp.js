import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, DialogContentText } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { SIGNIN } from "../../constants/constants";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
      <DialogTitle>Sign Up</DialogTitle>
      {error && <DialogContentText color="error"> {error} </DialogContentText>}

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
          //onClick={async () => {}}
        >
          Sign Up
        </Button>
      </DialogActions>
      <DialogActions>
        <a href={`/${SIGNIN}`}> Sign In </a>
      </DialogActions>
    </Dialog>
  );
};

export default SignUp;