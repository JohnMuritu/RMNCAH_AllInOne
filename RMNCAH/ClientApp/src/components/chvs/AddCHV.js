import { useEffect } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import {
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid
} from '@material-ui/core';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { useDispatch, useSelector } from 'react-redux';
import * as ACTION_TYPES from '../../actions/actions';

const AddCHV = () => {
  const dispatch = useDispatch();
  const chv_details = useSelector((state) => state.main_reducer.chvDetails);

  const handleAddCHV = (values) => {
    console.log(values);
    if (values.chv_id === 0) {
      axios
        .post('/api/utils/addchvs', values)
        .then((response) => {
          NotificationManager.success('CHV added successfully!', '', 2000);

          dispatch({
            type: ACTION_TYPES.UPDATE_COMPONENT
          });
        })
        .catch((error) => {
          console.log(`error : ${error}`);
          NotificationManager.error('Error occured!!!', '', 2000);
        });
    } else {
      axios
        .post('/api/utils/updatechvs', values)
        .then((response) => {
          NotificationManager.success('CHV updated successfully!', '', 2000);

          dispatch({
            type: ACTION_TYPES.UPDATE_COMPONENT
          });
        })
        .catch((error) => {
          console.log(`error : ${error}`);
          NotificationManager.error('Error occured!!!', '', 2000);
        });
    }
  };

  useEffect(() => {
    formik.setValues(chv_details);
  }, [chv_details]);

  const SignupSchema = Yup.object().shape({
    chv_name: Yup.string().max(255).required('CHV name is required')
  });

  const formik = useFormik({
    initialValues: {
      chv_id: 0,
      chv_name: '',
      active: '1'
    },
    onSubmit: (values) => {
      handleAddCHV(values);
    },
    validationSchema: SignupSchema,
    enableReinitialize: true
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Card>
        <CardHeader title="Add CHV" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.chv_name && formik.errors.chv_name
                )}
                fullWidth
                helperText={formik.touched.chv_name && formik.errors.chv_name}
                label="chv_name"
                margin="normal"
                name="chv_name"
                onChange={formik.handleChange}
                value={formik.values.chv_name}
                variant="outlined"
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Status</FormLabel>
                <RadioGroup
                  row
                  aria-label="Active"
                  name="active"
                  value={formik.values.active}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="1"
                    control={<Radio color="primary" />}
                    label="Active"
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio color="primary" />}
                    label="Inactive"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button
            color="primary"
            variant="contained"
            // onClick={() => resetForm()}
            type="reset"
            style={{ marginRight: 5 }}
          >
            Reset
          </Button>

          <Button
            color="primary"
            type="submit"
            variant="contained"
            //onClick={() => handleSave()}
            // onClick={() => e.preventDefault()}
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AddCHV;
