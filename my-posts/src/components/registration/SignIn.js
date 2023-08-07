import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Button, DialogContentText } from "@mui/material";
import { SIGNUP, USER } from "../../constants/constants";
import { Link, useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const SignIn = (props) => {
  const {open, setOpen} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Dialog
     open={open}
     onClose={() => {return setOpen(false)}}
      fullWidth
      sx={{
        textAlign: "center",
      }}
    >
      <DialogTitle> Sign In </DialogTitle>
      {error && <DialogContentText color="error"> {error} </DialogContentText>}
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
        <Link to='/'>
        <Button
          variant="outlined"
          disabled={email.length < 6 || password.length < 6}
          onClick={async () => {
            localStorage.setItem(USER, JSON.stringify(email))
            setEmail('')
            setPassword('')
            setOpen(false)
          }}
        >
          Sign In
        </Button>
        </Link>
      </DialogActions>
      <DialogActions>
        <a href={`/${SIGNUP}`}> Sign Up </a>
      </DialogActions>
    </Dialog>
  );
};

export default SignIn;
