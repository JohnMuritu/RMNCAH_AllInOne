import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';

const SettingsPassword = () => {
  const userId = useSelector((state) => state.main_reducer.user.sub);

  const handlePasswordUpdate = (values) => {
    axios
      .post('/api/user/changepassword', values)
      .then((response) => {
        NotificationManager.success('Password updated Successful!', '', 2000);
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
        userId: userId,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      }}
      validationSchema={Yup.object().shape({
        currentPassword: Yup.string()
          .min(6, 'Minimum 6 characters long')
          .max(255)
          .required('Current password is required')
          .matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 6 characters, one uppercase, one number and one special case character'
          ),
        newPassword: Yup.string()
          .min(6, 'Minimum 6 characters long')
          .max(255)
          .required('password is required')
          .matches(
            /^.*(?=.{6,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
            'Password must contain at least 6 characters, one uppercase, one number and one special case character'
          ),
        confirmNewPassword: Yup.string()
          .required('Please confirm your new password')
          .when('newPassword', {
            is: (newPassword) =>
              newPassword && newPassword.length > 0 ? true : false,
            then: Yup.string().oneOf(
              [Yup.ref('newPassword')],
              "Password doesn't match"
            )
          })
      })}
      onSubmit={(values) => {
        handlePasswordUpdate(values);
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
              // subheader="Update password"
              title="Update Password"
            />
            <Divider />
            <CardContent>
              <TextField
                error={Boolean(
                  touched.currentPassword && errors.currentPassword
                )}
                fullWidth
                helperText={touched.currentPassword && errors.currentPassword}
                label="Current Password"
                margin="normal"
                name="currentPassword"
                onChange={handleChange}
                type="password"
                value={values.currentPassword}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.newPassword && errors.newPassword)}
                fullWidth
                helperText={touched.newPassword && errors.newPassword}
                label="New Password"
                margin="normal"
                name="newPassword"
                onChange={handleChange}
                type="password"
                value={values.newPassword}
                variant="outlined"
              />
              <TextField
                error={Boolean(
                  touched.confirmNewPassword && errors.confirmNewPassword
                )}
                fullWidth
                helperText={
                  touched.confirmNewPassword && errors.confirmNewPassword
                }
                label="Confirm password"
                margin="normal"
                name="confirmNewPassword"
                onChange={handleChange}
                type="password"
                value={values.confirmNewPassword}
                variant="outlined"
              />
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
                Update Password
              </Button>
            </Box>
          </Card>
        </form>
      )}
    </Formik>
  );
};

export default SettingsPassword;
