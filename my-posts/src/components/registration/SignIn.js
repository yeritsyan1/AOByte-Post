import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { SIGNIN, SIGNUP } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SnackbarMessage from "../Snackbar";

const SignIn = (props) => {
  const { open, setOpen } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const signin = (e) => {
    e.preventDefault();
    fetch(`/${SIGNIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 200) {
          setEmail("");
          setPassword("");
          setOpen(false);
          setError("");
        }
        return res.json();
      })
      .then((res) => {
        if (res?.token && res?.user) {
          localStorage.setItem("token", JSON.stringify(res.token));
          localStorage.setItem("currentUser", JSON.stringify(res?.user));
          navigate("/");
        }
        setError(res.message);
      })
      .catch(() => alert("Try again"));
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        return setOpen(false);
      }}
      fullWidth
      sx={{
        textAlign: "center",
      }}
    >
      <DialogTitle> Sign In </DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          variant="outlined"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
        />
      </DialogContent>
      <DialogActions>
        <Link to="/">
          <Button
            variant="contained"
            disabled={email.length < 6 || password.length < 6}
            onClick={signin}
          >
            Sign In
          </Button>
        </Link>
      </DialogActions>
      <DialogActions>
        <a href={`/${SIGNUP}`}> Sign Up </a>
      </DialogActions>
      {!!error && <SnackbarMessage message={error} />}
    </Dialog>
  );
};

export default SignIn;
