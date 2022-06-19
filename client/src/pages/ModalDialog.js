/* eslint-disable */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// material
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material'

// ----------------------------------------------------------------------
import { setModal } from '../actions/manager';

export default function ModalDialog() {
    const dispatch = useDispatch();
    const open = useSelector(state => state.manager.modalOpen);
    const text = useSelector(state => state.manager.modalText);

    const handleClose = () => {
        dispatch(setModal(false));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            {/* <DialogTitle>Use Google's location service?</DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ color: 'white', fontSize: '18px' }}>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}
