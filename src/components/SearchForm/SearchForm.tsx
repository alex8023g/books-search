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
// import { getBooks } from '../../api/api';
import { nanoid } from 'nanoid';
import {
  loadingAction,
  resetStartIndexAction,
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
    dispatch(loadingAction(true));
    dispatch(searchAction({ searchQuery, category, orderBy }));
    dispatch(resetStartIndexAction());
    // getBooks(e, searchQuery, category, orderBy);
  }

  return (
    <Box
      component='form'
      onSubmit={(e) => {
        makeRequest(e);
      }}
      border='1px solid blue'
    >
      <h2>Форма поиска</h2>
      <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
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
                <SearchIcon fontSize='large' />
              </IconButton>
            </InputAdornment>
          }
          label='Введите запрос'
        />
      </FormControl>
      <br />
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id='demo-simple-select-label'>Категория</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={category}
          label='Категория'
          onChange={(e) => {
            setCategory(e.target.value);
            dispatch(searchAction({ searchQuery, category: e.target.value, orderBy }));
          }}
        >
          {categoryArr.map(({ text, val, key }) => (
            <MenuItem value={val} key={key}>
              {text}
            </MenuItem>
          ))}
          {/* <MenuItem value='byad'>Twenty</MenuItem> */}
          {/* <MenuItem value='{30}'>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <br />
      <br />
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id='sort-select-label'>Сортировка</InputLabel>
        <Select
          labelId='sort-select-label'
          id='sort-select'
          value={orderBy}
          label='Сортировка'
          onChange={(e) => {
            setOrderBy(e.target.value);
            dispatch(searchAction({ searchQuery, category, orderBy: e.target.value }));
          }}
        >
          {sortArr.map(({ text, val, key }) => (
            <MenuItem value={val} key={key}>
              {text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
