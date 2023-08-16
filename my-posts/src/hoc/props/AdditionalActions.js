import { Button, Divider } from "@mui/material";
import React, { useState } from "react";

export default function AdditionalActions(props) {
  const { item } = props;
  const [isClicked, setIsClicked] = useState(false);
  const [name, setName] = useState(item.isActive ? "Active" : "Passive");

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

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 5 }}>
        <span>
          Category: <i> {item.category} </i>{" "}
        </span>
        <div>
          <Button disabled={isClicked} onClick={onActive}>
            {name}
          </Button>
          <Button variant="contained" color="error">
            Delete
          </Button>
        </div>
      </div>
      <Divider />
    </>
  );
}
