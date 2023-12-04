import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ handleDeleteCancel, handleDeleteConfirm }) {

    return (
        <Dialog
            open
            TransitionComponent={Transition}
            keepMounted
            onClose={handleDeleteCancel}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogActions>
                <Button onClick={handleDeleteCancel}>Cancel</Button>
                <Button onClick={handleDeleteConfirm}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}