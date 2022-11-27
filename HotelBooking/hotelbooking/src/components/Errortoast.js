import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
export default function PositionedSnackbar({ showstate, message }) {
  const [state, setState] = React.useState({
    open: showstate,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  return (
    <>
      <Stack spacing={2}>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={handleClose}
          key={vertical + horizontal}
          autoHideDuration={30000}
          style={{ width: "330px" }}
        >
          <Alert severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}
