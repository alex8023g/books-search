import React from 'react';
import styles from './searchresults.module.css';
import {
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Snackbar,
  Typography,
} from '@mui/material';
import { RootState, isLoadingErrorAction } from '../../store/rootReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useBooksData } from '../../hooks/useBooksData';
import { LoadMoreBtn } from '../LoadMoreBtn';
import { useNavigate } from 'react-router-dom';

export interface BookData {
  id: string;
  volumeInfo: {
    authors: string[];
    categories: string[];
    title: string;
    description: string;
    imageLinks?: { thumbnail: string };
  };
}
export function SearchResults() {
  const isLoading = useSelector<RootState, boolean>((state) => state.isLoading);
  const isLoadingError = useSelector<RootState, boolean>((state) => state.isLoadingError);
  const isLoadMore = useSelector<RootState, boolean>((state) => state.isLoadMore);
  const [data, totalResults] = useBooksData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(data, totalResults, isLoadingError);
  function handleCloseAlert() {
    dispatch(isLoadingErrorAction(false));
  }

  return (
    <Box>
      {(data[0] || totalResults === 0) && <h2>Рузультаты поиска {totalResults}</h2>}
      <ul className={styles.booksUl}>
        {data[0] &&
          data.map(({ id, volumeInfo: { authors, categories, title, imageLinks } }) => (
            <li className={styles.bookLi} key={id}>
              <Card
                sx={{ position: 'relative', width: 245, height: '100%' }}
                elevation={3}
                onClick={() => navigate(`/details/${id}`)}
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
                  {categories && (
                    <Chip label={categories[0]} size='small' sx={{ maxWidth: '230px' }} />
                  )}
                </CardActions>
              </Card>
            </li>
          ))}
      </ul>
      {isLoading && !isLoadMore && <CircularProgress id='circle-progress' />}
      {isLoadMore && <LoadMoreBtn />}
      <Snackbar
        open={isLoadingError}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
        message='ошибка сервера'
      >
        <Alert severity='error' sx={{ width: '100%' }} variant='filled'>
          Ошибка сервера
        </Alert>
      </Snackbar>
    </Box>
  );
}
