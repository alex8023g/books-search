import React, { SyntheticEvent, useId, useState } from 'react';
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
  isLoadMoreAction,
  loadingAction,
  // resetStartIndexAction,
  searchAction,
} from '../../store/rootReducer';
import { useDispatch } from 'react-redux';

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
  const [category, setCategory] = useState('all');
  const [orderBy, setOrderBy] = useState('relevance');
  const dispatch = useDispatch();

  function makeRequest(e: SyntheticEvent) {
    e.preventDefault();
    if (!searchQuery) return;
    dispatch(loadingAction(true));
    dispatch(searchAction({ searchQuery, category, orderBy, startIndex: 0 }));
    // dispatch(resetStartIndexAction());
  }

  return (
    <section>
      <h1>Search for books</h1>
      <Box
        component='form'
        sx={{ margin: '0 auto', display: 'flex', flexDirection: 'column', maxWidth: 700 }}
        onSubmit={(e) => {
          makeRequest(e);
        }}
        // border='1px solid blue'
      >
        <FormControl
          variant='outlined'
          size='small'
          sx={{
            mb: 2,
            // width: '50vw',
            // flexGrow: 1,
          }}
        >
          <InputLabel htmlFor='outlined-adornment-password'>Введите запрос</InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type='text'
            onChange={(e) => setSearchQuery(e.target.value)}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  // onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  edge='end'
                  type='submit'
                >
                  {/* {showPassword ? <VisibilityOff /> : <Visibility />} */}
                  <SearchIcon fontSize='medium' />
                </IconButton>
              </InputAdornment>
            }
            label='Введите запрос'
          />
        </FormControl>
        <div>
          <FormControl size='small' sx={{ mr: 2, minWidth: 200 }}>
            <InputLabel id='demo-simple-select-label'>Категория</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={category}
              label='Категория'
              onChange={(e) => {
                setCategory(e.target.value);
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
                setOrderBy(e.target.value);
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
