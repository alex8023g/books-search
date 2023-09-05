import React, { useEffect, useState } from 'react';
import styles from './searchresults.module.css';
import { Box } from '@mui/material';
import { RootState, SearchParams } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
import { getBooks } from '../../api/api';
import { useBooksData } from '../../hooks/useBooksData';

export interface BookData {
  id: string;
  volumeInfo: {
    authors: string[];
    categories: string[];
    title: string;
  };
}

export function SearchResults() {
  const [data]: BookData[][] = useBooksData();
  console.log(data);
  // const searchParams = useSelector<RootState, SearchParams>(
  //   (state) => state.searchParams
  // );

  // useEffect(() => {
  //   console.log(searchParams);
  //   getBooks(searchParams);
  // }, [searchParams]);
  return (
    <Box border='1px solid green'>
      <h2>Рузультаты поиска</h2>
      {data.map(({ id, volumeInfo: { authors, categories, title } }) => (
        <li key={id}>{title}</li>
      ))}
    </Box>
  );
}
