import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const Defaulters = (props) => {
  const [rowData, setRowData] = useState([]);

  const getReport = () => {
    axios
      .get('/api/reports/defaulters')
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   function autoSizeAll() {
  //     var allColumnIds = [];
  //     gridOptions.columnApi.getAllColumns().forEach(function (column) {
  //       allColumnIds.push(column.colId);
  //     });

  //     gridOptions.columnApi.autoSizeColumns(allColumnIds, false);
  //   }

  const onGridReady = (params) => {
    // setGridApi(params.api);
    //params.api.sizeColumnsToFit();
    // params.columnApi.autoSizeAllColumns();
  };

  useEffect(() => {
    getReport();
  }, []);

  function dateFormatter(params) {
    if (params.value !== null) {
      return moment(params.value).format('DD-MMM-YYYY');
    }
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        rowSelection="single"
        onGridReady={onGridReady}
        // onSelectionChanged={onSelectionChanged}
        // frameworkComponents={{
        //   buttonRenderer: ButtonRenderer
        // }}
      >
        <AgGridColumn
          field="clientClinicalDetailsId"
          hide={true}
        ></AgGridColumn>
        <AgGridColumn
          field="full_names"
          headerName="Full Names"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="dept_client_id"
          headerName="Client ID"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="facility_name"
          headerName="Facility Name"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="edd"
          headerName="EDD"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="delivery"
          headerName="Delivery"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="delivery_date"
          headerName="Delivery Date"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="delivery_defaulter"
          headerName="Defaulter? (Delivery)"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="penta1"
          headerName="PENTA1"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="penta1_defaulter"
          headerName="Defaulter? (PENTA1)"
          sortable={true}
          filter={true}
        ></AgGridColumn>

        <AgGridColumn
          field="penta3"
          headerName="PENTA3"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="penta3_defaulter"
          headerName="Defaulter? (PENTA3)"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="mr1"
          headerName="MR1"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="mr1_defaulter"
          headerName="Defaulter? (MR1)"
          sortable={true}
          filter={true}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default Defaulters;
