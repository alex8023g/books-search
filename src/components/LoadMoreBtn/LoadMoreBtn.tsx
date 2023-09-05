import React, { useState } from 'react';
import styles from './loadmorebtn.module.css';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';

export function LoadMoreBtn() {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingButton
      onClick={() => setLoading(!loading)}
      endIcon={<AddIcon />}
      loading={loading}
      loadingPosition='end'
      variant='contained'
    >
      <span>Load more</span>
    </LoadingButton>
  );
}
