import React, { useState } from 'react';
import styles from './loadmorebtn.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { incStartIndexAction } from '../../store/rootReducer';

export function LoadMoreBtn() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  return (
    <LoadingButton
      onClick={() => {
        dispatch(incStartIndexAction());
        // setLoading(!loading);
      }}
      endIcon={<AddIcon />}
      // loading={loading}
      loadingPosition='end'
      variant='contained'
    >
      <span>Load more</span>
    </LoadingButton>
  );
}
