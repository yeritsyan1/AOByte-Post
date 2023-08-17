import { Button, Divider } from "@mui/material";
import React, { useState } from "react";
import { editPost } from "../postEdit/actions/editPost";
import { EditPostWithHOC } from "./EmptyComponent";
import SnackbarMessage from "../../components/Snackbar";

export default function AdditionalActions(props) {
  const { item } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState(item.isActive ? "Active" : "Passive");
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const onActive = async () => {
    await fetch("/isActive", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: item._id,
        isActive: !item.isActive,
      }),
    })
      .then((res) => res.json())
      .catch(() => {
        return;
      });
    await setIsClicked(true);
    await setName(item.isActive ? "Passive" : "Active");
  };

  const onDelete = async () => {
    await fetch("/delete", {
      method: "DELETE",
      headers: {
        _id: item._id,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setMessage(res.message);
      })
      .then(() => {
        setTimeout(() => {
          setMessage(null);
        }, 2000);
      });
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
