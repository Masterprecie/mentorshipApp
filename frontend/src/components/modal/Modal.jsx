import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
import PropType from "prop-types";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "80%",
  },
}));
const Modal = ({ children, handleClose, open }) => {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 15,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          close
        </IconButton>
        <DialogContent>{children}</DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
};

Modal.propTypes = {
  children: PropType.node,
  handleClose: PropType.func,
  open: PropType.bool,
};
export default Modal;
