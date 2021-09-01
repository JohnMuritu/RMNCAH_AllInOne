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

const RegisterUser = () => {
  const dispatch = useDispatch();
  const user_details = useSelector((state) => state.main_reducer.userDetails);
  // const updateComponent = useSelector(
  //   (state) => state.main_reducer.update_component
  // );

  const handleRegistration = (values) => {
    // console.log(values);
    if (values.userId === '') {
      axios
        .post('/api/user/signup', values)
        .then((response) => {
          NotificationManager.success('Registration Successful!', '', 2000);

          dispatch({
            type: ACTION_TYPES.UPDATE_COMPONENT
          });
        })
        .catch((error) => {
          console.log(`error : ${error}`);
          NotificationManager.error('Error occured!!!', '', 2000);
        });
    } else {
    }
  };

  useEffect(() => {
    formik.setValues(user_details);
  }, [user_details]);

  const SignupSchema = Yup.object().shape({
    userName: Yup.string().max(255).required('Last name is required'),
    email: Yup.string()
      .email('Must be a valid email')
      .max(255)
      .required('Email is required'),
    firstName: Yup.string().max(255).required('First name is required'),
    jobTitle: Yup.string().max(255).required('Job title is required'),
    // userRole: Yup.string().max(255).required('User role is required'),
    password: Yup.string()
      .min(6, 'Minimum 6 characters long')
      .max(255)
      .required('password is required')
      .matches(
        /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        'Password must contain at least 6 characters, one uppercase, one number and one special case character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .when('password', {
        is: (password) => (password && password.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          "Password doesn't match"
        )
      })
  });

  const formik = useFormik({
    initialValues: {
      userId: '',
      userName: '',
      email: '',
      firstName: '',
      lastName: '',
      jobTitle: '',
      userRole: 'USER',
      password: '',
      confirmPassword: ''
    },
    onSubmit: (values) => {
      handleRegistration(values);
    },
    validationSchema: SignupSchema,
    enableReinitialize: true
  });

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Card>
        <CardHeader title="Create new account" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.userName && formik.errors.userName
                )}
                fullWidth
                helperText={formik.touched.userName && formik.errors.userName}
                label="Username"
                margin="normal"
                name="userName"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                value={formik.values.userName}
                variant="outlined"
              />
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                fullWidth
                helperText={formik.touched.firstName && formik.errors.firstName}
                label="First name"
                margin="normal"
                name="firstName"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                value={formik.values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                fullWidth
                helperText={formik.touched.lastName && formik.errors.lastName}
                label="Last name"
                margin="normal"
                name="lastName"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                value={formik.values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.jobTitle && formik.errors.jobTitle
                )}
                fullWidth
                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                label="Job Title"
                margin="normal"
                name="jobTitle"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                value={formik.values.jobTitle}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(formik.touched.email && formik.errors.email)}
                fullWidth
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                margin="normal"
                name="email"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">User role</FormLabel>
                <RadioGroup
                  row
                  aria-label="UserRole"
                  name="userRole"
                  value={formik.values.userRole}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="ADMIN"
                    control={<Radio color="primary" />}
                    label="ADMIN"
                  />
                  <FormControlLabel
                    value="REPORT"
                    control={<Radio color="primary" />}
                    label="REPORT"
                  />
                  <FormControlLabel
                    value="USER"
                    control={<Radio color="primary" />}
                    label="USER"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                disabled={formik.values.userId !== ''}
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextField
                error={Boolean(
                  formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                )}
                fullWidth
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                label="Confirm Password"
                margin="normal"
                name="confirmPassword"
                // onBlur={handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.confirmPassword}
                variant="outlined"
                disabled={formik.values.userId !== ''}
              />
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
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default RegisterUser;
