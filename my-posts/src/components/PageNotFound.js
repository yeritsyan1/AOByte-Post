import React from "react";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { createUseStyles } from "react-jss";

const useStyle = createUseStyles({
  parent: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
    gap: 5,
  },
  child: {
    display: "flex",
    alignItems: "center",
  },
});

export default function PageNotFound() {
  const classes = useStyle();

  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        <h1> Page Not Found! </h1>
        <SentimentVeryDissatisfiedIcon fontSize="large" />
      </div>
      <Button variant="contained">
        <Link to="/"> Home </Link>
      </Button>
    </div>
  );
}
