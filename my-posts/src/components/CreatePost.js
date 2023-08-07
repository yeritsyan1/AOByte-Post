import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import SelectCategory from "./SelectCategory";
import { USER } from "../constants/constants";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const user = JSON.parse(localStorage.getItem(USER))?.email;
  const [category, setCategory] = useState("General");
  const navigate = useNavigate();
  const createPost = async () => {
    try {
      const docRef = await {
        authorId: user.uid,
        email: user.email,
        title: title,
        body: body,
        comments: [],
        category: category,
        rate: 0,
        id: uuid(),
        date: Date.now(),
      };
      setTitle("");
      setBody("");
    } catch {}
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
          onClick={createPost}
          disabled={title.length < 5 || body.length < 10}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
