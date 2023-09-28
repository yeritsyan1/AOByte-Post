import { Button } from "@mui/material";
import React, { useRef } from "react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

export default function Image(props) {
  const { imgList, setImgList } = props;
  const ref = useRef();

  const onFilter = (id) => {
    setImgList(() => {
      return imgList.filter((image) => image.id !== id);
    });
    return (ref.current.value = null);
  };
  return (
    <div>
      <label>
        <span> Add a photo (75KB) </span>
        <div
          style={{
            width: "20%",
            backgroundColor: "green",
            color: "white",
            margin: "5px auto",
            cursor: "cell",
          }}
        >
          <AddPhotoAlternateOutlinedIcon />
          <input
            type="file"
            style={{ display: "none" }}
            ref={ref}
            files={imgList.length - 1}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];

              if (e.target.files[0]) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  setImgList((oldImg) => {
                    return [
                      ...oldImg,
                      {
                        id: Date.now(),
                        src: e.target.result,
                      },
                    ];
                  });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </label>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 15,
        }}
      >
        {imgList.map((image, index) => {
          return (
            <div key={Math.random()}>
              <div style={{ display: "flex", alignItems: "end" }}>
                <p> {++index}) </p>
                <img
                  src={image.src}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <Button color="error" onClick={() => onFilter(image.id)}>
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
