import { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    // Autocomplete,
    MenuItem
} from '@material-ui/core';
import axios from 'axios';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import 'date-fns';
//import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import * as ACTION_TYPES from '../../actions/actions';

const ClientDetails = (props) => {
    const dispatch = useDispatch();

    const clientDetailsFetched = useSelector(
        (state) => state.main_reducer.clientDetails
    );
    const updateComponent = useSelector(
        (state) => state.main_reducer.update_component
    );
    // const update_client_details = useSelector(state => state.main_reducer.update_client_details);

    const [healthFacilities, setHealthFacilities] = useState([]);
    const [CHVs, setCHVs] = useState([]);
    const [healthFacilitiesFetched, setHealthFacilitiesFetched] = useState(false);
    const [CHVsFetched, setCHVsFetched] = useState(false);

    const handleSave = (clientDetails) => {
        console.log(clientDetails);
        if (clientDetails.clientId === '') {
            clientDetails.clientId = uuidv4();
            // console.log(clientDetails);
            axios
                .post('/api/client/addclientdetails', clientDetails)
                .then((response) => {
                    NotificationManager.success('Saved Successfully!', '', 2000);
                    formik.resetForm();

                    dispatch({
                        type: ACTION_TYPES.UPDATE_COMPONENT
                    });
                })
                .catch((error) => {
                    console.log(`error : ${error}`);
                    NotificationManager.error('Error Save!', '', 10000);
                    clientDetails.clientId = '';
                });
        } else {
            // console.log(clientDetails);
            axios
                .post('/api/client/updateclientdetails', clientDetails)
                .then((response) => {
                    NotificationManager.success('Updated Successfully!', '', 2000);

                    dispatch({
                        type: ACTION_TYPES.UPDATE_COMPONENT
                    });
                })
                .catch((error) => {
                    console.log(`error : ${error}`);
                    NotificationManager.error('Error Update!', '', 10000);
                });
        }

        dispatch({
            type: ACTION_TYPES.SET_CLIENT_DETAILS,
            payload: clientDetails
        });
    };

    const getHealthFacilities = () => {
        axios
            .get('/api/healthfacility')
            .then((response) => {
                setHealthFacilities(response.data);
                console.log('fetching facilities');
                setHealthFacilitiesFetched(true);
            })
            .catch((error) => {
                console.log(`error : ${error}`);
            });
    };

    const getCHVs = () => {
        axios
            .get('/api/utils/chvs')
            .then((response) => {
                setCHVs(response.data);
                console.log('fetching CHVs');
                setCHVsFetched(true);
            })
            .catch((error) => {
                console.log(`error : ${error}`);
            });
    };

    useEffect(() => {
        formik.setValues(clientDetailsFetched);
        if (!healthFacilitiesFetched) {
            getHealthFacilities();
        }

        if (!CHVsFetched) {
            getCHVs();
        }
    }, [clientDetailsFetched, updateComponent]);

    const SignupSchema = Yup.object().shape({
        chvId: Yup.string().required('CHV Name is required'),
        deptClientId: Yup.string().required('Client ID is required'),
        fullNames: Yup.string().required('Client Name is required'),
        dob: Yup.date().required('Required'),
        village: Yup.string().required('Village is required'),
        phoneNumber: Yup.string().required('Phone number is required'),
        alternativePhoneNumber: Yup.string().required(
            'Alternative Phone number is required'
        ),
        hfLinked: Yup.string().required('HF Linked is required').nullable(),
        otherHFAttended: Yup.string().required('Other HF attended is required'),
        hivStatusKnown: Yup.string().required('HIV Status Known is required')
        // testDone: Yup.string()
        //   //.required('Test done is required')
        //   .when(['hivStatusKnown'], (hivStatusKnown) => {
        //     return hivStatusKnown === 'No'
        //       ? Schema.required('Test done is required')
        //       : Schema.min(0);
        //   })
    });

    const formik = useFormik({
        initialValues: {
            clientId: '',
            chvId: '',
            chv: null,
            deptClientId: '',
            fullNames: '',
            dob: null,
            village: '',
            phoneNumber: '',
            alternativePhoneNumber: '',
            // hfLinked: {
            //   mflCode: '',
            //   facilityName: ''
            // },
            mfl_code: null,
            hfLinked: null,
            otherHFAttended: '',
            hivStatusKnown: '',
            testDone: ''
        },
        onSubmit: (values) => {
            handleSave(values);
        },
        validationSchema: SignupSchema,
        enableReinitialize: true
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <CardHeader title="Client Details" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        {/* <Grid item md={3} xs={12}>
              <TextField
                fullWidth
                label="CHV Name"
                name="chvName"
                onChange={formik.handleChange}
                value={formik.values.chvName}
                variant="outlined"
                helperText={formik.touched.chvName && formik.errors.chvName}
                error={Boolean(formik.touched.chvName && formik.errors.chvName)}
                size="small"
              />
            </Grid> */}

                        <Grid item md={3} xs={12}>
                            <Autocomplete
                                fullWidth
                                disableClearable
                                forcePopupIcon={false}
                                name="chv"
                                // freeSolo
                                value={formik.values.chv}
                                options={CHVs}
                                getOptionLabel={(option) => option.chv_name}
                                isOptionEqualToValue={(option, value) => option.chv_id === value.chvId}
                                //getOptionSelected={(option, value) =>
                                //    option.chv_id === value.chvId
                                //}
                                onChange={(event, newValue) => {
                                    formik.setFieldValue('chvId', newValue.chv_id);
                                    formik.setFieldValue('chv', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="CHV Name"
                                        variant="outlined"
                                        helperText={formik.touched.chvId && formik.errors.chvId}
                                        error={Boolean(formik.touched.chvId && formik.errors.chvId)}
                                    />
                                )}
                                size="small"
                            />
                        </Grid>

                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Full names"
                                name="fullNames"
                                onChange={formik.handleChange}
                                // onBlur={handleBlur}
                                value={formik.values.fullNames}
                                variant="outlined"
                                helperText={formik.touched.fullNames && formik.errors.fullNames}
                                error={Boolean(
                                    formik.touched.fullNames && formik.errors.fullNames
                                )}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>

                                <DatePicker
                                    //mask="__-___-____"
                                    inputFormat="dd-MMM-yyyy"
                                    label="Date of Birth"
                                    value={formik.values.dob}
                                    onChange={(val) => {
                                        formik.setFieldValue('dob', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.dob && formik.errors.dob}
                                            error={Boolean(formik.touched.dob && formik.errors.dob)}
                                            size="small"
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Village"
                                name="village"
                                onChange={formik.handleChange}
                                value={formik.values.village}
                                variant="outlined"
                                helperText={formik.touched.village && formik.errors.village}
                                error={Boolean(formik.touched.village && formik.errors.village)}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                onChange={formik.handleChange}
                                value={formik.values.phoneNumber}
                                variant="outlined"
                                helperText={
                                    formik.touched.phoneNumber && formik.errors.phoneNumber
                                }
                                error={Boolean(
                                    formik.touched.phoneNumber && formik.errors.phoneNumber
                                )}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Alternative Phone number"
                                name="alternativePhoneNumber"
                                onChange={formik.handleChange}
                                value={formik.values.alternativePhoneNumber}
                                variant="outlined"
                                helperText={
                                    formik.touched.alternativePhoneNumber &&
                                    formik.errors.alternativePhoneNumber
                                }
                                error={Boolean(
                                    formik.touched.alternativePhoneNumber &&
                                    formik.errors.alternativePhoneNumber
                                )}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <Autocomplete
                                fullWidth
                                disableClearable
                                forcePopupIcon={false}
                                name="hfLinked"
                                // freeSolo
                                value={formik.values.hfLinked}
                                options={healthFacilities}
                                getOptionLabel={(option) => option.facilityName}
                                isOptionEqualToValue={(option, value) => {
                                    option.mflCode === value.mfl_code
                                }}
                                //getOptionSelected={(option, value) => 
                                //    option.mflCode === value.mflCode
                                //}

                                onChange={(event, newValue) => {
                                    formik.setFieldValue('mfl_code', newValue.mflCode);
                                    formik.setFieldValue(
                                        'deptClientId',
                                        newValue.mflCode + '/XX/XXXX'
                                    );
                                    formik.setFieldValue('hfLinked', newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="HF Linked"
                                        variant="outlined"
                                        helperText={
                                            formik.touched.hfLinked && formik.errors.hfLinked
                                        }
                                        error={Boolean(
                                            formik.touched.hfLinked && formik.errors.hfLinked
                                        )}
                                    />
                                )}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Client ID (MFL/SR/Year)"
                                name="deptClientId"
                                onChange={formik.handleChange}
                                // onBlur={handleBlur}
                                value={formik.values.deptClientId}
                                variant="outlined"
                                helperText={
                                    formik.touched.deptClientId && formik.errors.deptClientId
                                }
                                error={Boolean(
                                    formik.touched.deptClientId && formik.errors.deptClientId
                                )}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Other HF attended"
                                name="otherHFAttended"
                                onChange={formik.handleChange}
                                value={formik.values.otherHFAttended}
                                variant="outlined"
                                helperText={
                                    formik.touched.otherHFAttended &&
                                    formik.errors.otherHFAttended
                                }
                                error={Boolean(
                                    formik.touched.otherHFAttended &&
                                    formik.errors.otherHFAttended
                                )}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                name="hivStatusKnown"
                                select
                                label="HIV Status Known"
                                value={formik.values.hivStatusKnown}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    if (e.target.value === 'Yes') {
                                        formik.setFieldValue('testDone', '');
                                    }
                                }}
                                helperText={
                                    formik.touched.hivStatusKnown && formik.errors.hivStatusKnown
                                }
                                error={Boolean(
                                    formik.touched.hivStatusKnown && formik.errors.hivStatusKnown
                                )}
                                size="small"
                            >
                                <MenuItem value="">Select</MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </TextField>
                        </Grid>
                        {formik.values.hivStatusKnown === 'No' && (
                            <Grid item md={3} xs={12}>
                                <TextField
                                    fullWidth
                                    name="testDone"
                                    select
                                    label="HIV Test Done"
                                    value={formik.values.testDone}
                                    onChange={formik.handleChange}
                                    helperText={formik.touched.testDone && formik.errors.testDone}
                                    error={Boolean(
                                        formik.touched.testDone && formik.errors.testDone
                                    )}
                                    size="small"
                                >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="Yes">Yes</MenuItem>
                                    <MenuItem value="No">No</MenuItem>
                                </TextField>
                            </Grid>
                        )}
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
                        onClick={() => formik.resetForm()}
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
                        Save details
          </Button>
                </Box>
            </Card>
        </form>
    );
};

export default ClientDetails;
