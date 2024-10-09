// Arquivo: ClientDelete.js

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useClientDelete from '../../hooks/useClientDelete/useClientDelete';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from '@mui/material';

const ClientDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    client,
    loading,
    error,
    deleteError,
    deleting,
    handleDeleteClient,
  } = useClientDelete(id);
  const [open, setOpen] = useState(true);

  // Funções para abrir e fechar o diálogo
  const handleClose = () => {
    setOpen(false);
    navigate('/clients');
  };

  const handleConfirmDelete = async () => {
    await handleDeleteClient();
    handleClose();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-3xl">
        Carregando detalhes do cliente...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <>
      {client && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="confirm-delete-title"
          aria-describedby="confirm-delete-description"
        >
          <DialogTitle id="confirm-delete-title">Excluir Cliente</DialogTitle>
          <DialogContent>
            <DialogContentText id="confirm-delete-description">
              Tem certeza que deseja excluir o cliente <strong>{client.name}</strong>?
              <br />
              Esta ação não poderá ser desfeita.
            </DialogContentText>
            {deleteError && (
              <div className="text-red-500 mt-4">
                {deleteError}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="secondary"
              autoFocus
              disabled={deleting}
              startIcon={deleting && <CircularProgress size={20} />}
            >
              {deleting ? 'Excluindo...' : 'Confirmar Exclusão'}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default ClientDelete;
