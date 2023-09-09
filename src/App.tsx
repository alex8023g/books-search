import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { SearchForm } from './components/SearchForm';
import { SearchResults } from './components/SearchResults';
import { Provider } from 'react-redux';
import { rootReducer } from './store/rootReducer';
import { createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <SearchForm />
        <SearchResults />
      </div>
    </Provider>
  );
}

export default App;
