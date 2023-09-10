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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { BookDetails } from './pages/BookDetails';
const store = createStore(rootReducer, composeWithDevTools());

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SearchForm />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/details/:id' element={<BookDetails />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
