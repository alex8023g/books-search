import React, { useEffect, useState } from 'react';
import styles from './searchresults.module.css';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material';
import { RootState, SearchParams } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
// import { getBooks } from '../../api/api';
import { step, useBooksData } from '../../hooks/useBooksData';
import { LoadMoreBtn } from '../LoadMoreBtn';

export interface BookData {
  id: string;
  volumeInfo: {
    authors: string[];
    categories: string[];
    title: string;
    imageLinks?: { thumbnail: string };
  };
}
let dataSum: BookData[] = [];
export function SearchResults() {
  const [data, totalResults, loadMore] = useBooksData();
  const isLoading = useSelector<RootState, boolean>((state) => state.isLoading);
  const isLoadMore = useSelector<RootState, boolean>((state) => state.isLoadMore);
  const startIndex = useSelector<RootState, number>(
    (state) => state.searchParams.startIndex
  );
  console.log(data, totalResults);
  // const dataMod: BookData[] = structuredClone(data);
  // if (data.length > step) {
  //   dataMod.pop();
  // }

  // dataSum = dataSum.concat(dataMod);
  return (
    <Box>
      {data[0] && <h2>Рузультаты поиска {totalResults}</h2>}
      <ul className={styles.booksUl}>
        {data &&
          data.map(({ id, volumeInfo: { authors, categories, title, imageLinks } }) => (
            <li className={styles.bookLi} key={id}>
              {/* {title}| {categories && categories[0]}| {authors} */}
              <Card
                sx={{ position: 'relative', width: 245, height: '100%' }}
                elevation={3}
              >
                <CardMedia
                  sx={{ height: 200, width: 150, margin: '0 auto' }}
                  image={(imageLinks && imageLinks.thumbnail) || ''}
                  title={title}
                />
                <CardContent sx={{ marginBottom: 3 }}>
                  <Typography gutterBottom variant='h6' component='div'>
                    {title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {authors && authors.join(', ')}
                  </Typography>
                </CardContent>
                <CardActions sx={{ position: 'absolute', bottom: 0 }}>
                  {categories && <Chip label={categories[0]} size='small' />}
                </CardActions>
              </Card>
            </li>
          ))}
      </ul>
      {isLoading && !isLoadMore && <CircularProgress />}
      {isLoadMore && <LoadMoreBtn />}
    </Box>
  );
}
