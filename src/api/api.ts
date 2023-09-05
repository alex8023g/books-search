export async function getBooks(
  e: React.SyntheticEvent,
  searchQuery: string,
  category: string,
  orderBy: string
) {
  console.log(searchQuery, category, orderBy);
  const subject = category === 'all' ? '' : category;
  let res = await fetch(
    // `https://www.googleapis.com/books/v1/volumes?q=flowers+subject:poetry&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
    `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}+subject:${subject}&maxResults=30&orderBy=${orderBy}&key=AIzaSyBSv54tEpbFZQ6SuliVMeE7H7HNgNZnkJ8`
  );
  res = await res.json();
  console.log('submit', res);
  return res;
}
