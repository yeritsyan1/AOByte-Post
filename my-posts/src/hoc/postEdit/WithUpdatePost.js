import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import SnackbarMessage from "../../components/Snackbar";
import { CURRENTUSER } from "../../constants/constants";
import SelectCategory from "../../components/SelectCategory";
import Image from "../../components/Image";

export default function withUpdatePost(Component) {
  return function (props) {
    const { _id, item, createOrUpdate, name, buttonName } = props;
    const [title, setTitle] = useState(item.title);
    const [body, setBody] = useState(item.body);
    const [category, setCategory] = useState(item.category);
    const [message, setMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();
    const [imgList, setImgList] = useState([]);

    return (
      <div>
        <Dialog open={true} fullWidth sx={{ textAlign: "center" }}>
          <DialogActions>
            <a href="/">
              <HouseIcon fontSize="large" color="error" />
            </a>
          </DialogActions>
          <DialogTitle> {name} </DialogTitle>
          <DialogContent>
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
                fullWidth
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
            <DialogContent>
              <Image imgList={imgList} setImgList={setImgList} />
            </DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={async () => {
                await createOrUpdate(
                  _id,
                  JSON.parse(CURRENTUSER).email,
                  title,
                  body,
                  category,
                  setDisabledButton,
                  setTitle,
                  setBody,
                  setCategory,
                  setMessage,
                  imgList
                );
                await setTitle("");
                await setBody("");
                await setCategory("General");
                await setImgList([]);
              }}
              disabled={
                ((body.length < 2 || disabledButton) && !imgList.length) ||
                title.length < 2
              }
            >
              {buttonName}
            </Button>
          </DialogActions>
          {message && <SnackbarMessage message={message} />}
        </Dialog>
        <Component />
      </div>
    );
  };
}
