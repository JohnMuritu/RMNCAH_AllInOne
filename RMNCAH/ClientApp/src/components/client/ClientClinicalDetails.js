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
    MenuItem
} from '@material-ui/core';
//import DateFnsUtils from '@date-io/date-fns';
import DatePicker from '@material-ui/lab/DatePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import { v4 as uuidv4 } from 'uuid';
import * as ACTION_TYPES from '../../actions/actions';

// const deliveryOptions = [
//   {
//     value: '0',
//     label: 'Select'
//   },
//   {
//     value: '1',
//     label: 'SBA'
//   },
//   {
//     value: '2',
//     label: 'HD (home delivery)'
//   },
//   {
//     value: '3',
//     label: 'BBA(Born before arrival)'
//   }
// ];

// const adultRemarksOptions = [
//   {
//     value: '0',
//     label: 'Select'
//   },
//   {
//     value: '1',
//     label: 'Abortion'
//   },
//   {
//     value: '2',
//     label: 'Miscarried'
//   },
//   {
//     value: '3',
//     label: 'Still birth'
//   },
//   {
//     value: '4',
//     label: 'Maternal death'
//   }
// ];

// const childRemarksOptions = [
//   {
//     value: '0',
//     label: 'Select'
//   },
//   {
//     value: '1',
//     label: 'Child death'
//   }
// ];

const ClientClinicalDetails = (props) => {
    const dispatch = useDispatch();

    const fullNames = useSelector(
        (state) => state.main_reducer.clientDetails.fullNames
    );
    const dob = useSelector((state) => state.main_reducer.clientDetails.dob);
    const clientId = useSelector(
        (state) => state.main_reducer.clientDetails.clientId
    );
    const hfLinked = useSelector(
        (state) => state.main_reducer.clientDetails.hfLinked.facilityName
    );

    const clientClinicalDetailsFetched = useSelector(
        (state) => state.main_reducer.clientClinicalDetails
    );

    const [deliveryOptions, setDeliveryOptions] = useState(null);
    const [adultRemarksOptions, setAdultRemarksOptions] = useState(null);
    const [childRemarksOptions, setChildRemarksOptions] = useState(null);

    const [parentRemarkSelected, setParentRemarkSelected] = useState(null);

    const calculate_age = () => {
        var today = new Date();
        var birthDate = new Date(dob); // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        return age_now;
    };

    const handleSave = (clientClinicalDetails) => {
        console.log(ClientClinicalDetails);
        if (clientClinicalDetails.clientClinicalDetailsId === '') {
            clientClinicalDetails.clientClinicalDetailsId = uuidv4();
            console.log(clientClinicalDetails);
            axios
                .post('/api/client/addClientClinicalDetails', clientClinicalDetails)
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
                    clientClinicalDetails.clientClinicalDetailsId = '';
                });
        } else {
            console.log(clientClinicalDetails);
            axios
                .post('/api/client/UpdateClientClinicalDetails', clientClinicalDetails)
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

        // axios
        //   .get('/api/client/clientdetails')
        //   .then((response) => {
        //     dispatch({
        //       type: ACTION_TYPES.CLIENT_LIST,
        //       payload: response.data
        //     });
        //   })
        //   .catch((error) => {
        //     console.log(`error : ${error}`);
        //   });
    };

    const getDeliveryOptions = () => {
        axios
            .get('/api/utils/deliveryoptions')
            .then((response) => {
                setDeliveryOptions(response.data);
            })
            .catch((error) => {
                console.log(`error : ${error}`);
            });
    };

    const getAdultRemarks = () => {
        axios
            .get('/api/utils/adultremarks')
            .then((response) => {
                setAdultRemarksOptions(response.data);
            })
            .catch((error) => {
                console.log(`error : ${error}`);
            });
    };

    const getChildRemarks = () => {
        axios
            .get('/api/utils/childremarks')
            .then((response) => {
                setChildRemarksOptions(response.data);
            })
            .catch((error) => {
                console.log(`error : ${error}`);
            });
    };

    useEffect(() => {
        if (clientId === clientClinicalDetailsFetched.clientId) {
            formik.setValues(clientClinicalDetailsFetched);

            if (clientClinicalDetailsFetched.adultRemarksOptions !== null) {
                setParentRemarkSelected(
                    clientClinicalDetailsFetched.adultRemarksOptions.option
                );
            } else {
                setParentRemarkSelected(null);
            }
        }

        if (!deliveryOptions) {
            getDeliveryOptions();
        }

        if (!adultRemarksOptions) {
            getAdultRemarks();
        }

        if (!childRemarksOptions) {
            getChildRemarks();
        }
    }, [clientClinicalDetailsFetched]);

    const SignupSchema = Yup.object().shape({
        // anc1: Yup.date(),
        // anc2: Yup.date().when(
        //   'anc1',
        //   (anc1, schema) =>
        //     anc1 && schema.min(anc1, 'ANC2 should be greater than ANC1')
        // )
        // anc3: Yup.date().when(
        //   'anc2',
        //   (anc2, schema) =>
        //     anc2 && schema.min(anc2, 'ANC3 should be greater than ANC2')
        // )
        // anc4: Yup.date().when(
        //   'anc3',
        //   (anc3, schema) =>
        //     anc3 && schema.min(anc3, 'ANC4 should be greater than ANC3')
        // ),
        // anc5: Yup.date().when(
        //   'anc4',
        //   (anc4, schema) =>
        //     anc4 && schema.min(anc4, 'ANC5 should be greater than ANC4')
        // ),
        // edd: Yup.date().when(
        //   'anc5',
        //   (anc5, schema) =>
        //     anc5 && schema.min(anc5, 'EDD should be greater than ANC5')
        // )
    });

    const formik = useFormik({
        initialValues: {
            clientClinicalDetailsId: '',
            clientId: clientId,
            babyName: '',
            anc1: null,
            anc2: null,
            anc3: null,
            anc4: null,
            anc5: null,
            edd: null,
            remarksParent: 0,
            remarksParentDate: null,
            delivery: 0,
            deliveryDate: null,
            penta1: null,
            penta2: null,
            penta3: null,
            mr1: null,
            remarksChild: 0,
            remarksChildDate: null
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
                <CardHeader
                    // subheader="Enter client clinical details"
                    title="Client Clinical Details"
                />
                <Divider />

                <CardContent>
                    <Grid container spacing={3} marginBottom={3}>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Full names"
                                name="fullNames"
                                value={fullNames}
                                variant="outlined"
                                inputProps={{
                                    readOnly: true
                                }}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                value={calculate_age()}
                                variant="outlined"
                                inputProps={{
                                    readOnly: true
                                }}
                                size="small"
                            />
                        </Grid>
                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="HF Linked"
                                name="hfLinked"
                                value={hfLinked}
                                variant="outlined"
                                inputProps={{
                                    readOnly: true
                                }}
                                size="small"
                            />
                        </Grid>

                        <Grid item md={3} xs={12}>
                            <TextField
                                fullWidth
                                label="Baby Name"
                                name="babyName"
                                value={formik.values.babyName}
                                onChange={formik.handleChange}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="ANC 1"
                                    value={formik.values.anc1}
                                    onChange={(val) => {
                                        formik.setFieldValue('anc1', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.anc1 && formik.errors.anc1}
                                            error={Boolean(formik.touched.anc1 && formik.errors.anc1)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="ANC 2"
                                    value={formik.values.anc2}
                                    onChange={(val) => {
                                        formik.setFieldValue('anc2', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.anc2 && formik.errors.anc2}
                                            error={Boolean(formik.touched.anc2 && formik.errors.anc2)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="ANC 3"
                                    value={formik.values.anc3}
                                    onChange={(val) => {
                                        formik.setFieldValue('anc3', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.anc3 && formik.errors.anc3}
                                            error={Boolean(formik.touched.anc3 && formik.errors.anc3)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="ANC 4"
                                    value={formik.values.anc4}
                                    onChange={(val) => {
                                        formik.setFieldValue('anc4', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.anc4 && formik.errors.anc4}
                                            error={Boolean(formik.touched.anc4 && formik.errors.anc4)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="ANC 5"
                                    value={formik.values.anc5}
                                    onChange={(val) => {
                                        formik.setFieldValue('anc5', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.anc5 && formik.errors.anc5}
                                            error={Boolean(formik.touched.anc5 && formik.errors.anc5)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="EDD"
                                    value={formik.values.edd}
                                    onChange={(val) => {
                                        formik.setFieldValue('edd', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.edd && formik.errors.edd}
                                            error={Boolean(formik.touched.edd && formik.errors.edd)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField
                                    fullWidth
                                    name="remarksParent"
                                    select
                                    label="Remarks (Parent)"
                                    value={formik.values.remarksParent}
                                    onChange={(e, val) => {
                                        formik.handleChange(e);
                                        setParentRemarkSelected(val.props.children);
                                        formik.setFieldValue('delivery', null);
                                        formik.setFieldValue('deliveryDate', null);
                                        formik.setFieldValue('penta1', null);
                                        formik.setFieldValue('penta2', null);
                                        formik.setFieldValue('penta3', null);
                                        formik.setFieldValue('mr1', null);
                                        formik.setFieldValue('remarksChild', null);
                                        formik.setFieldValue('remarksChildDate', null);
                                    }}
                                    size="small"
                                >
                                    <MenuItem value={0}>Select</MenuItem>
                                    {adultRemarksOptions &&
                                        adultRemarksOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.option}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    inputFormat="dd-MMM-yyyy"
                                    label="Remarks Parent Date"
                                    value={formik.values.remarksParentDate}
                                    onChange={(val) => {
                                        formik.setFieldValue('remarksParentDate', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.remarksParentDate && formik.errors.remarksParentDate}
                                            error={Boolean(formik.touched.remarksParentDate && formik.errors.remarksParentDate)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    fullWidth
                                    name="delivery"
                                    select
                                    label="Delivery"
                                    value={formik.values.delivery}
                                    onChange={formik.handleChange}
                                    size="small"
                                >
                                    <MenuItem value={0}>Select</MenuItem>
                                    {deliveryOptions &&
                                        deliveryOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.option}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    inputFormat="dd-MMM-yyyy"
                                    label="Delivery Date"
                                    value={formik.values.deliveryDate}
                                    onChange={(val) => {
                                        formik.setFieldValue('deliveryDate', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.deliveryDate && formik.errors.deliveryDate}
                                            error={Boolean(formik.touched.deliveryDate && formik.errors.deliveryDate)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    inputFormat="dd-MMM-yyyy"
                                    label="PENTA 1"
                                    value={formik.values.penta1}
                                    onChange={(val) => {
                                        formik.setFieldValue('penta1', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.penta1 && formik.errors.penta1}
                                            error={Boolean(formik.touched.penta1 && formik.errors.penta1)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    inputFormat="dd-MMM-yyyy"
                                    label="PENTA 2"
                                    value={formik.values.penta2}
                                    onChange={(val) => {
                                        formik.setFieldValue('penta2', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.penta2 && formik.errors.penta2}
                                            error={Boolean(formik.touched.penta2 && formik.errors.penta2)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    inputFormat="dd-MMM-yyyy"
                                    label="PENTA 3"
                                    value={formik.values.penta3}
                                    onChange={(val) => {
                                        formik.setFieldValue('penta3', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.penta3 && formik.errors.penta3}
                                            error={Boolean(formik.touched.penta3 && formik.errors.penta3)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    inputFormat="dd-MMM-yyyy"
                                    label="MR 1"
                                    value={formik.values.mr1}
                                    onChange={(val) => {
                                        formik.setFieldValue('mr1', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.mr1 && formik.errors.mr1}
                                            error={Boolean(formik.touched.mr1 && formik.errors.mr1)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <TextField
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    fullWidth
                                    name="remarksChild"
                                    select
                                    label="Remarks (Child)"
                                    value={formik.values.remarksChild}
                                    onChange={formik.handleChange}
                                    size="small"
                                >
                                    <MenuItem value={0}>Select</MenuItem>
                                    {childRemarksOptions &&
                                        childRemarksOptions.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.option}
                                            </MenuItem>
                                        ))}
                                </TextField>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <DatePicker
                                    disabled={
                                        parentRemarkSelected === 'Abortion' ||
                                        parentRemarkSelected === 'Still birth' ||
                                        parentRemarkSelected === 'Maternal death' ||
                                        parentRemarkSelected === 'Miscarriage'
                                    }
                                    inputFormat="dd-MMM-yyyy"
                                    label="Remarks Child Date"
                                    value={formik.values.remarksChildDate}
                                    onChange={(val) => {
                                        formik.setFieldValue('remarksChildDate', val);
                                    }}
                                    disableFuture={true}
                                    renderInput={(props) => (
                                        <TextField {...props}
                                            fullWidth
                                            helperText={formik.touched.remarksChildDate && formik.errors.remarksChildDate}
                                            error={Boolean(formik.touched.remarksChildDate && formik.errors.remarksChildDate)}
                                            size="small"
                                        />
                                    )}
                                />
                            </Grid>
                        </LocalizationProvider>
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
                    <Button color="primary" variant="contained" type="submit">
                        Save details
          </Button>
                </Box>
            </Card>
        </form>
    );
};

export default ClientClinicalDetails;
