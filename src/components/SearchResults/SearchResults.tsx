import React, { useEffect, useState } from 'react';
import styles from './searchresults.module.css';
import { Box } from '@mui/material';
import { RootState, SearchParams } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { getBooks } from '../../api/api';

export function SearchResults() {
  const searchParams = useSelector<RootState, SearchParams>(
    (state) => state.searchParams
  );
  useEffect(() => {
    console.log(searchParams);
    getBooks(searchParams);
  }, [searchParams]);
  return (
    <Box border='1px solid green'>
      <h2>Рузультаты поиска</h2>
    </Box>
  );
}
