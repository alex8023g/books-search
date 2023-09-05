import { BookData } from '../components/SearchResults';
import { SearchParams } from '../store/rootReducer';

export async function getBooks({ searchQuery, category, orderBy }: SearchParams) {
  console.log(searchQuery, category, orderBy);
  if (!searchQuery) return;
  const subject = category === 'all' ? '' : '+subject:' + category;
  console.log(
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&maxResults=30&orderBy=${orderBy}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
  );

  try {
    let res = await fetch(
      // `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:poetry&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
      // `https://www.googleapis.c÷om/books/v1/volumes?q=${searchQuery}+subject:${subject}&maxResults=30&orderBy=${orderBy}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${category}&maxResults=30&orderBy=${orderBy}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
    );
    let { items }: { items: BookData[] } = await res.json();
    console.log('api getbooks', items);
    return items;
  } catch {
    throw new Error('ошибка api запроса');
  }
}
