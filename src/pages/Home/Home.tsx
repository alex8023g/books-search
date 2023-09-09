import React from 'react';
import styles from './home.module.css';
import { SearchForm } from '../../components/SearchForm';
import { SearchResults } from '../../components/SearchResults';

export function Home() {
  return (
    <div className='App'>
      {/* <SearchForm /> */}
      <SearchResults />
    </div>
  );
}
