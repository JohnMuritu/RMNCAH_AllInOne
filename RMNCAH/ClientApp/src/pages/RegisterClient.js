import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ClientDetails from '../components/client/ClientDetails';
import ClientList from '../components/client/ClientList';
//import customers from 'src/__mocks__/customers';

const RegisterClient = () => (
  <>
    <Helmet>
      <title>Client List | RMNCAH</title>
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
            <ClientDetails />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <ClientList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default RegisterClient;
