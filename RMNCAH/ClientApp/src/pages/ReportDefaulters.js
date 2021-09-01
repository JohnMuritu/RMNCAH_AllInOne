import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ClientLongitudinalReportList from '../components/reports/ClientLongitudinalReportList';
import ReportsSummary from '../components/reports/ReportsSummary';
import BasicDateRangePicker from '../components/reports/BasicDateRangePicker';
import Defaulters from '../components/reports/Defaulters';

const ReportDefaulters = () => (
  <>
    <Helmet>
      <title>Reports | RMNCAH</title>
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
            <Defaulters />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default ReportDefaulters;
