import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DateFnsUtils from '@date-io/date-fns';
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

function AddTraining(props) {
    
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const inputChanged = (event) => {
        setTraining({ ...training, [event.target.name]: event.target.value });
        if (training.customer === '') {
            setTraining({ ...training, customer: props.params.value[0].href });
        }
    };

    const handleDateChange = (event) => {
        setDate(event);
        let b = event.toISOString();
        setTraining({ ...training, date: b });
    }

    const handleSave = () => {
        props.addTraining(training);
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={date} onChange={handleDateChange} />
                    </MuiPickersUtilsProvider>
                    <TextField
                        name="activity"
                        value={training.activity}
                        onChange={inputChanged}
                        margin="dense"
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        name="duration"
                        value={training.duration}
                        onChange={inputChanged}
                        margin="dense"
                        label="Duration"
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

export default AddTraining;