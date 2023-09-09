import React from 'react';
import styles from './bookdetails.module.css';
import { SearchForm } from '../../components/SearchForm';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { BookData } from '../../components/SearchResults';
import { Box, Paper } from '@mui/material';

export function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const booksData = useSelector<RootState, BookData[]>((state) => state.booksData);
  const bookData = booksData.filter((item) => item.id === id)[0];
  console.log(id, bookData);
  if (!bookData) {
    window.location.replace('/');
  }
  const {
    // id,
    volumeInfo: { authors, categories, title, imageLinks, description },
  } = bookData;
  return (
    <>
      <section className={styles.section1}>
        <Box sx={{ margin: '0 auto', maxWidth: 700 }}>
          <h2 className={styles.h2}>Book details</h2>
          <Paper
            sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
            elevation={3}
          >
            {/* <div className={styles.contentWrap}> */}
            <img className={styles.img} src={imageLinks?.thumbnail} alt={title} />
            <div className={styles.textWrap}>
              <h3 className={styles.h3}>{title}</h3>
              <p>
                <span className={styles.bold}>авторы: </span>
                {authors.join(', ')}
              </p>
              <p>{description}</p>
              <p>
                <span className={styles.bold}>категории: </span>
                {categories.join(', ')}
              </p>
            </div>
            {/* </div> */}
          </Paper>
        </Box>
      </section>
    </>
  );
}
