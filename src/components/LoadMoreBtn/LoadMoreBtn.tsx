import React, { useState } from 'react';
import styles from './loadmorebtn.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, incStartIndexAction } from '../../store/rootReducer';

export function LoadMoreBtn() {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector<RootState, boolean>((state) => state.isLoading);

  return (
    <LoadingButton
      id='load-more-btn'
      onClick={() => {
        dispatch(incStartIndexAction());
      }}
      endIcon={<AddIcon />}
      loading={isLoading}
      loadingPosition='end'
      variant='contained'
    >
      <span>Load more</span>
    </LoadingButton>
  );
}
