import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import * as ACTION_TYPES from '../../actions/actions';

const CHVsList = () => {
  const dispatch = useDispatch();
  const [rowData, setRowData] = useState([]);
  const [gridApi, setGridApi] = useState(null);

  const updateComponent = useSelector(
    (state) => state.main_reducer.update_component
  );

  const getCHVsList = () => {
    axios
      .get('/api/utils/chvs')
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
      type: ACTION_TYPES.SET_CHV_DETAILS,
      payload: selectedRow[0]
    });
  };

  useEffect(() => {
    getCHVsList();
  }, [updateComponent]);

  function activeFormatter(params) {
    if (params.value === '1') {
      return 'Active';
    } else {
      return 'Inactive';
    }
  }

  return (
    <div className="ag-theme-alpine" style={{ height: 350, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        rowSelection="single"
        onGridReady={onGridReady}
        onSelectionChanged={onSelectionChanged}
      >
        <AgGridColumn field="chv_id" hide={true}></AgGridColumn>
        <AgGridColumn
          field="chv_name"
          headerName="CHV Name"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="active"
          headerName="Status"
          sortable={true}
          filter={true}
          valueFormatter={activeFormatter}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default CHVsList;
