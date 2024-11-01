import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import { MdCancel } from "react-icons/md";

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
const Modal = ({ children, handleClose, open, title }) => {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="pt-3 text-center font-bold text-2xl text-black">
          <h1>{title}</h1>
        </div>
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
          <MdCancel />
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
  title: PropType.string,
};
export default Modal;
