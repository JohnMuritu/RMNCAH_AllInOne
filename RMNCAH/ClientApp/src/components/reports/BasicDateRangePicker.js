import * as React from 'react';
//import TextField from '@material-ui/core/TextField';
//import DateRangePicker from '@material-ui/lab/DateRangePicker';
//import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
//import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
//import Box from '@material-ui/core/Box';
import { Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import * as ACTION_TYPES from '../../actions/actions';

export default function BasicDateRangePicker(props) {
  const [value, setValue] = React.useState([null, null]);
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={6}>
        <Grid item lg={4} sm={4} xl={4} xs={4}>
          {/*<LocalizationProvider dateAdapter={AdapterDateFns}>*/}
          {/*  <DateRangePicker*/}
          {/*    startText="Date From"*/}
          {/*    endText="Date To"*/}
          {/*    value={value}*/}
          {/*    onChange={(newValue) => {*/}
          {/*      setValue(newValue);*/}
          {/*      console.log(newValue);*/}
          {/*      // props.getDateFilters(newValue);*/}
          {/*    }}*/}
          {/*    renderInput={(startProps, endProps) => (*/}
          {/*      <React.Fragment>*/}
          {/*        <TextField {...startProps} />*/}
          {/*        <Box sx={{ mx: 2 }}> to </Box>*/}
          {/*        <TextField {...endProps} />*/}
          {/*      </React.Fragment>*/}
          {/*    )}*/}
          {/*  />*/}
          {/*</LocalizationProvider>*/}
        </Grid>

        <Grid item lg={1} sm={1} xl={1} xs={1}>
          <Button
            color="primary"
            variant="contained"
            // size="small"
            onClick={() => {
              dispatch({
                type: ACTION_TYPES.DATE_FROM,
                payload: value[0]
              });

              dispatch({
                type: ACTION_TYPES.DATE_TO,
                payload: value[1]
              });
            }}
          >
            Filter
          </Button>
        </Grid>

        <Grid item lg={3} sm={3} xl={3} xs={3}>
          <Button
            color="primary"
            variant="contained"
            // size="small"
            onClick={() => {
              dispatch({
                type: ACTION_TYPES.DATE_FROM,
                payload: null
              });

              dispatch({
                type: ACTION_TYPES.DATE_TO,
                payload: null
              });

              setValue([null, null]);
            }}
          >
            RESET
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
