import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import moment from 'moment';


function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    const gridRef = useRef();

    useEffect(() => {
        getTrainings();
    }, [])

    const prout = (params)=>{
        return params.data.customer.firstname+' '+params.data.customer.lastname;
    }

    const caca = (params)=>{
        return moment(params.data.date).format('DD.MM.YY, h:mm:ss a');
    }

    const columns = [
        { headerName: 'Activity', field: 'activity', sortable: true, filter: true },
        { headerName: 'Date', field: 'date', valueFormatter:caca, sortable: true, filter: true },
        { headerName: 'Duration (min)', field: 'duration', sortable: true, filter: true },
        { headerName: 'Customer', valueGetter:prout, sortable: true, filter: true },
    ]

    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
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
                    rowData={trainings}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
            </div>
        </div>
    );
}

export default Traininglist;