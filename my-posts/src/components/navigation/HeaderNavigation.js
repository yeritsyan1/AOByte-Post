import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useLocation } from "react-router-dom";
import { CREATEPOST, MYPOSTS, SIGNIN } from "../../constants/constants";
import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";

export default function NavTabs() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "rgba(232, 196, 153, .8)",
          display: "flex",
          justifyContent: "end",
          "@media (max-width: 600px)": {
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        {[
          { name: "Home", path: "/" },
          { name: "My Posts", path: `/${MYPOSTS}` },
          { name: "Create Post", path: `/${CREATEPOST}` },
          {
            name: "Log Out",
            path: `/${SIGNIN}`,
            action: () => localStorage.clear(),
          },
        ].map((tab) => {
          return (
            <Button key={uuid()} onClick={tab.action}>
              <Link
                to={tab.path}
                style={{
                  color: path === tab.path ? "white" : "red",
                  padding: "15px",
                  variant: "h1",
                }}
              >
                {tab.name}
              </Link>
            </Button>
          );
        })}
      </Box>
    </>
  );
}
