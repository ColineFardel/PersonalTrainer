import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

function EditCustomer(props) {

    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
    })

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            email: props.params.data.email,
            phone: props.params.data.phone,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        props.updateCustomer(props.params.value, customer);
        handleClose();
    }

    return (
        <div>
            <IconButton variant="outlined" color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="firstname"
                        value={customer.firstname}
                        onChange={inputChanged}
                        margin="dense"
                        label="First name"
                        fullWidth
                    />
                    <TextField
                        name="lastname"
                        value={customer.lastname}
                        onChange={inputChanged}
                        margin="dense"
                        label="Last name"
                        fullWidth
                    />
                    <TextField
                        name="email"
                        value={customer.email}
                        onChange={inputChanged}
                        margin="dense"
                        label="Email"
                        fullWidth
                    />
                    <TextField
                        name="phone"
                        value={customer.phone}
                        onChange={inputChanged}
                        margin="dense"
                        label="Phone"
                        fullWidth
                    />
                    <TextField
                        name="streetaddress"
                        value={customer.streetaddress}
                        onChange={inputChanged}
                        margin="dense"
                        label="Address"
                        fullWidth
                    />
                    <TextField
                        name="postcode"
                        value={customer.postcode}
                        onChange={inputChanged}
                        margin="dense"
                        label="Postcode"
                        fullWidth
                    />
                    <TextField
                        name="city"
                        value={customer.city}
                        onChange={inputChanged}
                        margin="dense"
                        label="City"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer;