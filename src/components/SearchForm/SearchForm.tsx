import React, { SyntheticEvent, useState } from 'react';
import styles from './searchform.module.css';
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { nanoid } from 'nanoid';
import {
  Category,
  OrderBy,
  isLoadMoreAction,
  searchAction,
} from '../../store/rootReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useBooksData } from '../../hooks/useBooksData';

let categoryArr = [
  { text: 'Все категории', val: 'all', key: '' },
  { text: 'Искусство', val: 'art', key: '' },
  { text: 'Биография', val: 'biography', key: '' },
  { text: 'Компьютеры', val: 'computers', key: '' },
  { text: 'История', val: 'history', key: '' },
  { text: 'Медицина', val: 'medical', key: '' },
  { text: 'Поэзия', val: 'poetry', key: '' },
].map((item) => ({ ...item, key: nanoid() }));

let sortArr = [
  { text: 'По релевантности', val: 'relevance', key: '' },
  { text: 'По новизне', val: 'newest', key: '' },
].map((item) => ({ ...item, key: nanoid() }));

export function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState<Category>('all');
  const [orderBy, setOrderBy] = useState<OrderBy>('relevance');
  useBooksData();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function makeRequest(e: SyntheticEvent) {
    e.preventDefault();
    if (!searchQuery) return;
    dispatch(searchAction({ searchQuery, category, orderBy, startIndex: 0 }));
    navigate('/');
  }

  return (
    <section className={styles.section1}>
      <h1>Search for books</h1>
      <Box
        component='form'
        sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', maxWidth: 700 }}
        onSubmit={(e) => {
          makeRequest(e);
        }}
      >
        <FormControl
          variant='outlined'
          size='small'
          sx={{
            mb: 2,
          }}
        >
          <InputLabel htmlFor='req-input'>Введите запрос</InputLabel>
          <OutlinedInput
            id='req-input'
            type='text'
            onChange={(e) => setSearchQuery(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  id='btn-search'
                  aria-label='toggle password visibility'
                  edge='end'
                  type='submit'
                >
                  <SearchIcon fontSize='medium' />
                </IconButton>
              </InputAdornment>
            }
            label='Введите запрос'
          />
        </FormControl>
        <div className={styles.menuWrap}>
          <FormControl size='small' sx={{ minWidth: 200 }}>
            <InputLabel id='category-select-menu-label'>Категория</InputLabel>
            <Select
              labelId='category-select-menu-label'
              id='category-select-menu'
              value={category}
              label='Категория'
              onChange={(e) => {
                setCategory(e.target.value as Category);
                dispatch(isLoadMoreAction(false));
                dispatch(
                  searchAction({
                    searchQuery,
                    category: e.target.value,
                    orderBy,
                    startIndex: 0,
                  })
                );
              }}
            >
              {categoryArr.map(({ text, val, key }) => (
                <MenuItem value={val} key={key}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size='small' sx={{ minWidth: 200 }}>
            <InputLabel id='sort-select-label'>Сортировка</InputLabel>
            <Select
              labelId='sort-select-label'
              id='sort-select'
              value={orderBy}
              label='Сортировка'
              onChange={(e) => {
                setOrderBy(e.target.value as OrderBy);
                dispatch(isLoadMoreAction(false));
                dispatch(
                  searchAction({
                    searchQuery,
                    category,
                    orderBy: e.target.value,
                    startIndex: 0,
                  })
                );
              }}
            >
              {sortArr.map(({ text, val, key }) => (
                <MenuItem value={val} key={key}>
                  {text}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Box>
    </section>
  );
}
