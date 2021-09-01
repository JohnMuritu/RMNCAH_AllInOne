import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import FacebookIcon from '../icons/Facebook';
import GoogleIcon from '../icons/Google';
import * as ACTION_TYPES from '../actions/actions';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    console.log(values);
    axios
      .post('/api/user/signin', values)
      .then((response) => {
        NotificationManager.success('Login Successful!', '', 2000);
        dispatch({
          type: ACTION_TYPES.AUTHENTICATION,
          payload: response.data
        });

        navigate('/app/registerclient');
      })
      .catch((error) => {
        console.log(`error : ${error}`);
        NotificationManager.error(
          'Error. Kindly contact your systems administrator',
          '',
          5000
        );
      });
  };

  return (
    <>
      <Helmet>
        <title>Login | RMNCAH</title>
      </Helmet>
      <Box
        sx={{
          // backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 3 }}>
            <img
              alt="Logo"
              src="/static/logo.jpeg"
              style={{
                width: 550
              }}
            />
          </Box>

          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              handleLogin(values);
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
                {/* <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" variant="h2">
                    Sign in
                  </Typography>
                </Box> */}
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Username"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
