import React, { useState } from 'react';
import DatePicker from '@material-ui/lab/DatePicker';
//import DateFnsUtils from '@date-io/date-fns';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

function InlineDatePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        variant="inline"
        label="Basic example"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DatePicker
        disableToolbar
        variant="inline"
        label="Only calendar"
        helperText="No year selection"
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="With keyboard"
        format="MM/dd/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: 'start' }}
        onChange={(date) => handleDateChange(date)}
          />
      </LocalizationProvider>
  );
}

export default InlineDatePickerDemo;
