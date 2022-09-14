import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeleteConfirmation(props) {
  const {dialogueOpen, setDialogueOpen, handleDelete, id} = props;

  const handleClose = () => {
    setDialogueOpen(false);
  };

  return (
    <>
      <Dialog
        open={dialogueOpen}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Are You Sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            The selected Record will be deleted permanently from database as well.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => {handleDelete(id); handleClose()}} autoFocus color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
