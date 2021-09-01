import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import ClientLongitudinalReportList from '../components/reports/ClientLongitudinalReportList';
import ReportsSummary from '../components/reports/ReportsSummary';
import BasicDateRangePicker from '../components/reports/BasicDateRangePicker';
import Defaulters from '../components/reports/Defaulters';

const ReportsPage = () => (
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
          {/* <Grid item lg={12} md={12} xl={12} xs={12}>
            <h4>Filter by Period</h4>
            <hr />
            <br />
            <br />
            <BasicDateRangePicker />
            <br />
            <br />
            <hr />
          </Grid> */}
          <Grid item lg={12} md={12} xs={12}>
            <ClientLongitudinalReportList />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <ReportsSummary />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default ReportsPage;
