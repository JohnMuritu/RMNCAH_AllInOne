import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import RegisterUser from '../components/account/RegisterUser';
import UsersList from '../components/account/UsersList';

const RegisterUserPage = () => (
  <>
    <Helmet>
      <title>Add User | RMNCAH</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <RegisterUser />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <UsersList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default RegisterUserPage;
