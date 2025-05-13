import React from 'react';

import { Dialog, DialogContent } from '@mui/material';

import './customDialog-styles.scss';

interface ICustomDialogProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

const CustomDialog = (props: ICustomDialogProps) => {
  const { children, onClose, open } = props;
  return (
    <Dialog onClose={onClose} className="custom-dialog" open={open}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
