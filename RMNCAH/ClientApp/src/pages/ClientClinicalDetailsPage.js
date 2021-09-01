import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ClientClinicalDetails from '../components/client/ClientClinicalDetails';
import ClientClinicalDetailsList from '../components/client/ClientClinicalDetailsList';

const ClientClinicalDetailsPage = () => (
  <>
    <Helmet>
      <title>Clinical Details | RMNCAH</title>
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
            <ClientClinicalDetails />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <ClientClinicalDetailsList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default ClientClinicalDetailsPage;
