import { SearchParams } from '../store/rootReducer';

export async function getBooks({ searchQuery, category, orderBy }: SearchParams) {
  console.log(searchQuery, category, orderBy);
  const subject = category === 'all' ? '' : '+subject:' + category;
  let res = await fetch(
    // `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:poetry&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
    // `https://www.googleapis.c÷om/books/v1/volumes?q=${searchQuery}+subject:${subject}&maxResults=30&orderBy=${orderBy}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${category}&maxResults=30&orderBy=${orderBy}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
  );
  res = await res.json();
  console.log('api getbooks', res);
  return res;
}
