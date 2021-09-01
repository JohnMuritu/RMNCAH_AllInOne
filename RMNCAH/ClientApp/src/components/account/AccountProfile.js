import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const AccountProfile = (props) => {
  const firstName = useSelector((state) => state.main_reducer.user.FirstName);
  const lastName = useSelector((state) => state.main_reducer.user.LastName);
  const jobTitle = useSelector((state) => state.main_reducer.user.JobTitle);

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src="/static/images/avatars/avatar_6.png"
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {firstName} {lastName}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {jobTitle}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
