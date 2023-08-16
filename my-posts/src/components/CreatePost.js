import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import SelectCategory from "./SelectCategory";
import { USER } from "../constants/constants";
import SnackbarMessage from "./Snackbar";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const user = JSON.parse(localStorage.getItem(USER));
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");
  const [disabledButton, setDisabledButton] = useState(false);
  const navigate = useNavigate();

  const createNewPost = async () => {
    setDisabledButton(true);
    await fetch("/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: user,
        title: title,
        body: body,
        comments: [],
        category: category,
        rate: 0,
        date: Date.now(),
        isActive: true,
      }),
    })
      .then((res) => {
        setDisabledButton(false);
        if (res.status === 200) {
          setTitle("");
          setBody("");
          setCategory("General");
        }
        return res.json();
      })
      .then((res) => {
        setMessage(res.message);
      })
      .then(() => {
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      })
      .catch(() => {});
  };

  return (
    <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
      <DialogActions>
        <a href="/">
          <HouseIcon fontSize="large" color="error" />
        </a>
      </DialogActions>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Title"
          value={title}
          onChange={(e) => {
            return setTitle(e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent>
        <TextField
          style={{ overflow: "scroll" }}
          placeholder="Type something..."
          multiline
          rows="3"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </DialogContent>
      <DialogContent>
        <SelectCategory category={category} setCategory={setCategory} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => navigate(-1)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={createNewPost}
          disabled={title.length < 2 || body.length < 10 || disabledButton}
        >
          Create
        </Button>
      </DialogActions>
      {message && <SnackbarMessage message={message} />}
    </Dialog>
  );
};

export default CreatePost;
