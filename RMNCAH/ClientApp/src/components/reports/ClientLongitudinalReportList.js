import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const ClientLongitudinalReportList = (props) => {
  const [rowData, setRowData] = useState([]);

  const getReport = () => {
    axios
      .get('/api/reports/clientLongitudinalList')
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getReport();
  }, []);

  function dateFormatter(params) {
    if (params.value !== null) {
      return moment(params.value).format('DD-MMM-YYYY');
    }
  }

  const onGridReady = (params) => {
    // setGridApi(params.api);
    //params.api.sizeColumnsToFit();
    params.columnApi.autoSizeAllColumns();
  };

  return (
    <>
      <h2>Client outcome follow up register</h2>

      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          rowSelection="single"
          // onGridReady={onGridReady}
          // onSelectionChanged={onSelectionChanged}
          // frameworkComponents={{
          //   buttonRenderer: ButtonRenderer
          // }}
        >
          <AgGridColumn
            field="clientClinicalDetailsId"
            hide={true}
          ></AgGridColumn>
          <AgGridColumn field="clientId" hide={true}></AgGridColumn>
          <AgGridColumn
            field="chvName"
            headerName="CHV Name"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="deptClientId"
            headerName="Client ID"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="fullNames"
            headerName="Full Names"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="age"
            headerName="Age"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="village"
            headerName="Village"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="phoneNumber"
            headerName="Phone"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="alternativePhoneNumber"
            headerName="Alternative Phone"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="hfLinked"
            headerName="HF Linked"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="otherHFAttended"
            headerName="Other HF Attended"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="babyName"
            headerName="Baby Name"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="anc1"
            headerName="ANC1"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="anc2"
            headerName="ANC2"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="anc3"
            headerName="ANC3"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="anc4"
            headerName="ANC4"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="anc5"
            headerName="ANC5"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="edd"
            headerName="EDD"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="remarks_parent"
            headerName="Remarks (Parent)"
            sortable={true}
            filter={true}
          ></AgGridColumn>
          <AgGridColumn
            field="delivery"
            headerName="Delivery"
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
            field="penta2"
            headerName="PENTA2"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="penta3"
            headerName="PENTA3"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="mr1"
            headerName="MR1"
            sortable={true}
            filter={true}
            valueFormatter={dateFormatter}
          ></AgGridColumn>
          <AgGridColumn
            field="remarks_child"
            headerName="Remarks (Child)"
            sortable={true}
            filter={true}
          ></AgGridColumn>
        </AgGridReact>
      </div>
    </>
  );
};

export default ClientLongitudinalReportList;
