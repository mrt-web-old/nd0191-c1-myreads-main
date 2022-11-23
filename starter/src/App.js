import "./App.css";
import React, { useEffect, useState } from "react";

import * as api from './BooksAPI';
import { Routes, Route } from 'react-router-dom'
import SearchPage from "./pages/SearchPage";
import ShelvesPage from "./pages/ShelvesPage";


function App() {
  const [books, setBooks] = useState([]);
  const [searchResults, setSeachResults] = useState([]);

  // apply shelf for search results books
  const applyShelves = (book) => {
    const stateBook = books.find(e => e.id === book.id);
    book.shelf = stateBook ? stateBook.shelf : 'none';
    return book;
  }

  // TODO: Implement [ update ui only if api succeeds ]
  // TODO: Implement [ show api results feedback ]
  // TODO: Implement [ leverage Redux ]

  // TODO: Thinkout [ state inside the Book Component ]

  const updateSearchResults = (value) => {
    setSeachResults([...value.map(applyShelves)])
  }

  const _updateBook = (book, shelf, bookContainer, updateContainer, deleteUnshelfed = false) => {
    let index = bookContainer.findIndex(e => e.id === book.id);
    if (index < 0) {
      if (shelf === 'none' || !shelf) return
      bookContainer.push(book);
      index = bookContainer.length - 1;
    }

    bookContainer[index].shelf = shelf;
    if (deleteUnshelfed && (shelf === 'none' || !shelf))
      bookContainer.splice(index, 1)

    updateContainer([...bookContainer]);
    api.update(book, shelf)
  }

  // changing the bookContainer shelf
  const updateBook = (book, shelf, path = '/') => {
    if (path === '/search')
      _updateBook(book, shelf, searchResults, setSeachResults)

    _updateBook(book, shelf, books, setBooks, true)
  };

  const loadAllBooks = () => (async () => {
    const allBooks = await api.getAll();
    setBooks(allBooks)
  });

  // fetch data and update internal state once mounted
  useEffect(() => {
    loadAllBooks()()
  }, [])

  return (
    <Routes>
      <Route path='/search'
        element={
          <SearchPage
            searchResults={searchResults}
            updateSearchResults={updateSearchResults}
            onChange={updateBook}
          />}
      />
      <Route exact path='/'
        element={<ShelvesPage books={books} onChange={updateBook} />}
      />
    </Routes>
  );
}

export default App;
