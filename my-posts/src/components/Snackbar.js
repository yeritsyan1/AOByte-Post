import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export default function SnackbarMessage(props) {
  const { message } = props;

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={true}
        message={message}
        variant="error"
      />
    </Box>
  );
}
