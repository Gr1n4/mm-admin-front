import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { byIdModSelector } from '../../mod.selector';

interface RemoveModalProps {
  isOpen: boolean;
  modId: string;
  onClose: () => void;
  onRemove: () => void;
}

export const RemoveModal: FC<RemoveModalProps> = ({ isOpen, modId, onClose, onRemove }) => {
  const mod = useSelector((state) => byIdModSelector(state, modId));

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <DialogTitle>Вы уверены что хотите удалить мод?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{mod.name.ru}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onRemove}>
          Удалить
        </Button>
        <Button onClick={onClose} autoFocus>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};
