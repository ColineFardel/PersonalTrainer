import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function Customerlist() {
    const [customers, setCustomers] = useState([]);

    const gridRef = useRef();

    useEffect(() => {
        getCustomers();
    }, [])

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable: true, filter: true },
        { headerName: 'Last name', field: 'lastname', sortable: true, filter: true },
        { headerName: 'Email', field: 'email', sortable: true, filter: true },
        { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
        { headerName: 'Address', field: 'streetaddress', sortable: true, filter: true },
        { headerName: 'Postcode', field: 'postcode', sortable: true, filter: true },
        { headerName: 'City', field: 'city', sortable: true, filter: true },
    ]

    const getCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .catch(err => console.error(err))
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
                    rowData={customers}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default Customerlist;