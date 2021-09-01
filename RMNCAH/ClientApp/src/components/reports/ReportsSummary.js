import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import axios from 'axios';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';

const ReportsSummary = (props) => {
  const [rowData, setRowData] = useState([]);

  const getReport = () => {
    axios
      .get('/api/reports/clinicalAggregatedSummary')
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
    params.columnApi.autoSizeAllColumns();
  };

  useEffect(() => {
    getReport();
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 120, width: '100%' }}>
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
          field="total_anc1"
          headerName="Total ANC1"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_anc2"
          headerName="Total ANC2"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_anc3"
          headerName="Total ANC3"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_anc4"
          headerName="Total ANC4"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_anc5"
          headerName="Total ANC5"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_edd"
          headerName="Total EDD"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_penta1"
          headerName="Total PENTA1"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_penta2"
          headerName="Total PENTA2"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_penta3"
          headerName="Total PENTA3"
          sortable={true}
          filter={true}
        ></AgGridColumn>
        <AgGridColumn
          field="total_mr1"
          headerName="Total MR1"
          sortable={true}
          filter={true}
        ></AgGridColumn>
      </AgGridReact>
    </div>
  );
};

export default ReportsSummary;
