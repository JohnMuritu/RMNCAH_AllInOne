import React from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as ACTION_TYPES from '../../actions/actions';

function ButtonRenderer(params) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch({
      type: ACTION_TYPES.SET_CLIENT_DETAILS,
      payload: params.node.data
    });

    // console.log(params.node.data);
    navigate('/app/clientClinicalDetails');
  };

  return (
    <Button
      color="primary"
      type="submit"
      variant="outlined"
      size="small"
      onClick={onClick}
    >
      Select
    </Button>
  );
}

export { ButtonRenderer };
