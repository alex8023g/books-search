import React from 'react';
import logo from './logo.svg';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SearchForm } from './components/SearchForm';
import { SearchResults } from './components/SearchResults';
import { LoadMoreBtn } from './components/LoadMoreBtn';
import { Provider, useSelector } from 'react-redux';
import { rootReducer } from './store/rootReducer';
import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <h1>поиск книг</h1>
        <SearchForm />
        <SearchResults />
        <LoadMoreBtn />
      </div>
    </Provider>
  );
}

export default App;
