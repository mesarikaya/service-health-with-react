import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Snackbars(props) {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    props?.setSnack(false);
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={props?.duration}
        onClose={handleClose}
        sx={{ bottom: "60px !important" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Alert
          variant="filled"
          onClose={handleClose}
          severity={props?.variant}
          sx={{ bottom: "120px", width: "100%" }}
        >
          {props?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
