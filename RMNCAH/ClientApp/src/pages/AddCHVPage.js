import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AddCHV from '../components/chvs/AddCHV';
import CHVsList from '../components/chvs/CHVsList';

const AddCHVPage = () => (
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
            <AddCHV />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <CHVsList />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default AddCHVPage;
