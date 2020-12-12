import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';

function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, [])

    const nameGetter = (params) => {
        return params.data.customer.firstname + ' ' + params.data.customer.lastname;
    }

    const dateFormatter = (params) => {
        return moment(params.data.date).format('DD.MM.YY, h:mm:ss a');
    }

    const columns = [
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', valueFormatter: dateFormatter, sortable: true, filter: true },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
        { headerName: 'Customer', valueGetter: nameGetter, sortable: true, filter: true },
        {
            headerName: '',
            field: 'id',
            width: 80,
            cellRendererFramework: params => <IconButton
                color='secondary'
                size='small'
                onClick={() => deleteTraining(params.value)}>
                <DeleteIcon />
            </IconButton>
        },
    ]

    const deleteTraining = (id) => {
        console.log(id);
        let link = 'https://customerrest.herokuapp.com/api/trainings/'+id;
        if (window.confirm('Are you sure ?')) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(_ => getTrainings())
                .then(_ => {
                    setMsg('Training was deleted successfully');
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
    }

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(err => console.error(err))
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto' }}>

                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={msg}
                />
            </div>
        </div>
    );
}

export default Traininglist;