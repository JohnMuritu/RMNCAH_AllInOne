import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { ButtonRenderer } from './ButtonRenderer';
import * as ACTION_TYPES from '../../actions/actions';

const ClientList = (props) => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const updateComponent = useSelector(
    (state) => state.main_reducer.update_component
  );

  const getClientList = () => {
    axios
      .get('/api/client/clientdetails')
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    //params.api.sizeColumnsToFit();
  };

  const onSelectionChanged = () => {
    var selectedRow = gridApi.getSelectedRows();
    // console.log(selectedRow);
    dispatch({
      type: ACTION_TYPES.SET_CLIENT_DETAILS,
      payload: selectedRow[0]
    });
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  };

  useEffect(() => {
    getClientList();
  }, [updateComponent]);

  // function formatNumber(number) {
  //   // this puts commas into the number eg 1000 goes to 1,000,
  //   // i pulled this from stack overflow, i have no idea how it works
  //   // return Math.floor(number)
  //   return number
  //     .toFixed(2)
  //     .toString()
  //     .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  // }

  // function currencyFormatter(params) {
  //   return '$' + formatNumber(params.value);
  // }

  // function percentageFormatter(params) {
  //   return params.value + '%';
  // }

  function dateFormatter(params) {
    if (params.value !== null) {
      return moment(params.value).format('DD-MMM-YYYY');
    }
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 350, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        rowSelection="single"
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
        frameworkComponents={{
          buttonRenderer: ButtonRenderer
        }}
      >
        <AgGridColumn field="clientId" hide={true}></AgGridColumn>
        <AgGridColumn
          field="chv.chv_name"
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
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="dob"
          headerName="DOB"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="village"
          headerName="Village"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="phoneNumber"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="alternativePhoneNumber"
          headerName="Other Phone No"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="hfLinked.facilityName"
          headerName="Health Facility"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="otherHFAttended"
          headerName="Other Health Facility"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="hivStatusKnown"
          headerName="HIV Status"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="testDone"
          headerName="Test done"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn field="" width={135} cellRenderer="buttonRenderer" />
      </AgGridReact>
    </div>
  );
};

export default ClientList;
