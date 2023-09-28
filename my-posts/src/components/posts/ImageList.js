import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { v4 as uuid } from "uuid";

export default function PostImgList(props) {
  const { item } = props;

  return (
    <ImageList cols={item.length} style={{ display: "flex", flexWrap: "wrap" }}>
      {item.imgList?.map((item) => (
        <ImageListItem
          key={uuid()}
          style={{ maxWidth: 300, maxHeight: 450, margin: "0 auto" }}
        >
          <img style={{ objectFit: "contain" }} src={item.src} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
}
