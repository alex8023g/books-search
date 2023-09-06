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
  Typography,
} from '@mui/material';
import { RootState, SearchParams } from '../../store/rootReducer';
import { useSelector } from 'react-redux';
// import { getBooks } from '../../api/api';
import { useBooksData } from '../../hooks/useBooksData';

export interface BookData {
  id: string;
  volumeInfo: {
    authors: string[];
    categories: string[];
    title: string;
    imageLinks?: { thumbnail: string };
  };
}

export function SearchResults() {
  const [data, totalResults] = useBooksData();
  console.log(data);

  return (
    <Box border='1px solid green'>
      <h2>Рузультаты поиска {totalResults}</h2>

      {data &&
        data.map(({ id, volumeInfo: { authors, categories, title, imageLinks } }) => (
          <li className={styles.li} key={id}>
            {/* {title}| {categories && categories[0]}| {authors} */}
            <Card sx={{ pt: 3, maxWidth: 245 }} elevation={3}>
              <CardMedia
                sx={{ height: 200, width: 150, margin: '0 auto' }}
                image={imageLinks && imageLinks.thumbnail}
                title='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h6' component='div'>
                  {title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {authors && authors.join(', ')}
                </Typography>
              </CardContent>
              <CardActions>
                {/* <Button size='small'>Share</Button> */}
                {/* <Button size='small'>{categories && categories[0]}</Button> */}
                {categories && <Chip label={categories[0]} size='small' />}
                {/* <Chip label={categories && categories[0]} size='small' variant='outlined' /> */}
              </CardActions>
            </Card>
          </li>
        ))}
    </Box>
  );
}
