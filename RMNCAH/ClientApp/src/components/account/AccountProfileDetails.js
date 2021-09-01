import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const AccountProfileDetails = (props) => {
  const firstName = useSelector((state) => state.main_reducer.user.FirstName);
  const lastName = useSelector((state) => state.main_reducer.user.LastName);
  const email = useSelector((state) => state.main_reducer.user.email);
  const jobTitle = useSelector((state) => state.main_reducer.user.JobTitle);
  const userName = useSelector((state) => state.main_reducer.user.unique_name);

  const handleSave = (values) => {
    axios
      .post('/api/user/UpdateProfile', values)
      .then((response) => {
        NotificationManager.success('Profile updated Successful!', '', 2000);
        // navigate('/app/registerclient');
      })
      .catch((error) => {
        console.log(`error : ${error}`);
        NotificationManager.error('Error occured!!!', '', 2000);
      });
  };

  return (
    <Formik
      initialValues={{
        userName: userName,
        firstName: firstName,
        lastName: lastName,
        email: email,
        jobTitle: jobTitle
      }}
      validationSchema={Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required')
      })}
      onSubmit={(values) => {
        handleSave(values);
        // navigate('/app/dashboard', { replace: true });
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader
              // subheader="The information can be edited"
              title="Profile"
            />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.firstName && errors.firstName)}
                    fullWidth
                    helperText={touched.firstName && errors.firstName}
                    label="First name"
                    name="firstName"
                    onChange={handleChange}
                    value={values.firstName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.lastName && errors.lastName)}
                    fullWidth
                    helperText={touched.lastName && errors.lastName}
                    label="Last name"
                    name="lastName"
                    onChange={handleChange}
                    value={values.lastName}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                    variant="outlined"
                    inputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    name="jobtitle"
                    onChange={handleChange}
                    value={values.jobTitle}
                    variant="outlined"
                    inputProps={{
                      readOnly: true
                    }}
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
              <Button color="primary" variant="contained" type="submit">
                Save details
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default AccountProfileDetails;
