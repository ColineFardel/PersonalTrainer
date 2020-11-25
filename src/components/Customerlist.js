import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function Customerlist() {
    const [customers, setCustomers] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, [])

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure ?)')) {
            fetch(link, {
                method: 'DELETE'
            })
                .then(_ => getCustomers())
                .then(_ => {
                    setMsg('Customer was deleted successfully');
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
    }

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
        {
            headerName: '',
            field: '_links.self.href',
            width: 80,
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params} />
        },
        {
            headerName: '',
            field: '_links.self.href',
            width: 80,
            cellRendererFramework: params => <IconButton
                color='secondary'
                size='small'
                onClick={() => deleteCustomer(params.value)}>
                <DeleteIcon />
            </IconButton>
        },
    ]

    const handleClose = () => {
        setOpen(false);
    }

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(newCustomer)
        })
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer added successfully');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(_ => getCustomers())
            .then(_ => {
                setMsg('Customer modified successfully');
                setOpen(true);
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <div className="ag-theme-material" style={{ height: '700px', width: '80%', margin: 'auto' }}>
                <AddCustomer addCustomer={addCustomer} />
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={customers}
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

export default Customerlist;