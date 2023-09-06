import { BookData } from '../components/SearchResults';
// import { SearchParams } from '../store/rootReducer';

// export async function getBooks({ searchQuery, category, orderBy }: SearchParams) {
//   console.log(searchQuery, category, orderBy);
//   if (!searchQuery) return;
//   const subject = category === 'all' ? '' : '+subject:' + category;
//   const URI = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}${subject}&orderBy=${orderBy}&startIndex=0&maxResults=5&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`;

//   console.log(URI);

//   try {
//     let res = await fetch(URI);
//     let { items }: { items: BookData[] } = await res.json();
//     console.log('api getbooks', items);
//     return items;
//   } catch {
//     throw new Error('ошибка api запроса');
//   }
// }
