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

const ClientClinicalDetailsList = (props) => {
  const dispatch = useDispatch();
  const clientId = useSelector(
    (state) => state.main_reducer.clientDetails.clientId
  );
  const updateComponent = useSelector(
    (state) => state.main_reducer.update_component
  );
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const getClientList = () => {
    axios
      .get(`/api/client/ClientClinicalDetails/${clientId}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    // params.api.sizeColumnsToFit();
  };

  const onSelectionChanged = () => {
    var selectedRow = gridApi.getSelectedRows();
    console.log(selectedRow);
    dispatch({
      type: ACTION_TYPES.SET_CLIENT_CLINICAL_DETAILS,
      payload: selectedRow[0]
    });
    // document.querySelector('#selectedRows').innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  };

  useEffect(() => {
    getClientList();
  }, [updateComponent]);

  function dateFormatter(params) {
    if (params.value !== null) {
      return moment(params.value).format('DD-MMM-YYYY');
    }
  }

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
        <AgGridColumn
          field="clientClinicalDetailsId"
          hide={true}
        ></AgGridColumn>
        <AgGridColumn field="clientId" hide={true}></AgGridColumn>
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
          field="remarksParent"
          headerName="Remarks Parent"
          hide={true}
        ></AgGridColumn>
        <AgGridColumn
          field="adultRemarksOptions.option"
          headerName="Remarks Parent"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="remarksParentDate"
          headerName="Remarks Parent Date"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
        <AgGridColumn
          field="delivery"
          headerName="Delivery"
          hide={true}
        ></AgGridColumn>
        <AgGridColumn
          field="deliveryOptions.option"
          headerName="Delivery"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="deliveryDate"
          headerName="Delivery Date"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
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
        <AgGridColumn field="remarksChild" hide={true}></AgGridColumn>
        <AgGridColumn
          field="childRemarksOptions.option"
          headerName="Remarks Child"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="remarksChildDate"
          headerName="Remarks Child Date"
          sortable={true}
          filter={true}
          valueFormatter={dateFormatter}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default ClientClinicalDetailsList;
