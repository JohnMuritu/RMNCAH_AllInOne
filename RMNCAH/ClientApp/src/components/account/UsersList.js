import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import * as ACTION_TYPES from '../../actions/actions';

const UsersList = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const updateComponent = useSelector(
    (state) => state.main_reducer.update_component
  );

  const getUsersList = () => {
    axios
      .get('/api/user')
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  const onSelectionChanged = () => {
    var selectedRow = gridApi.getSelectedRows();
    console.log(selectedRow);
    dispatch({
      type: ACTION_TYPES.SET_USER_DETAILS,
      payload: selectedRow[0]
    });
  };

  useEffect(() => {
    getUsersList();
  }, [updateComponent]);

  return (
    <div className="ag-theme-alpine" style={{ height: 350, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        rowSelection="single"
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
      >
        <AgGridColumn field="userId" hide={true}></AgGridColumn>
        <AgGridColumn
          field="userName"
          headerName="Username"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="firstName"
          headerName="First Name"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="lastName"
          headerName="Last Name"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="jobTitle"
          headerName="Job Title"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="email"
          headerName="Email"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="userRole"
          headerName="User Role"
          sortable={true}
          filter={true}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default UsersList;
