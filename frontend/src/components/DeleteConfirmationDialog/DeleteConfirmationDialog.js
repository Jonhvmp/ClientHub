// Arquivo: DeleteConfirmationDialog.js

import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, deleteLoading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Tem certeza que deseja excluir este cliente? Esta ação não poderá ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="secondary" autoFocus disabled={deleteLoading}>
          {deleteLoading ? 'Excluindo...' : 'Confirmar Exclusão'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
