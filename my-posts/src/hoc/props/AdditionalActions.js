import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { editPost } from "../postEdit/actions/editPost";
import { EditPostWithHOC } from "./EmptyComponent";
import SnackbarMessage from "../../components/Snackbar";
import { useDispatch } from "react-redux";
import { deletePost } from "../../redux/slices/deletePost";
import { changeActive } from "../../redux/slices/myPostReducer";

export default function AdditionalActions(props) {
  const { item } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState(item.isActive ? "Active" : "Passive");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const onDelete = async () => {
    await dispatch(deletePost(item._id, setMessage));
  };

  const onActive = () => {
    dispatch(changeActive(item, setIsClicked, setName));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
        <span>
          Category: <i> {item.category} </i>
        </span>
        <div>
          <Button disabled={isClicked} onClick={onActive}>
            {name}
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
      <Divider />
      {isOpen && (
        <EditPostWithHOC
          _id={item._id}
          item={item}
          name="Edit Post"
          buttonName="Edit"
          createOrUpdate={editPost}
        />
      )}
      {message && <SnackbarMessage message={message} />}
    </>
  );
}
