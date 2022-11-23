import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../BooksAPI'
import Book from '../components/Book';

const SearchPage = ({ onChange, searchResults, updateSearchResults }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null)
    // const [searchResults, setSeachResults] = useState([]);

    useEffect(() => {
        inputRef.current.focus()

        // useEffect clean up
        return () => {
            updateSearchResults([]);
        };
    }, []);

    useEffect(() => {
        if (value.trim().length === 0) return;
        let queryResult = [];

        (async () => {
            const query = await api.search(value, 10);
            if (query instanceof Array)
                queryResult = query;

            updateSearchResults(queryResult);
        })();

    }, [value]);

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>

                <div className="search-books-input-wrapper">
                    <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={evt => setValue(evt.target.value)}
                        placeholder="Search by title, author, or ISBN"
                    />
                </div>

            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {
                        searchResults.length > 0 ?
                            searchResults.map(e => <Book key={e.id} bookInfo={e} onChange={onChange} />) :
                            <div>No Results</div>
                    }
                </ol>
            </div>
        </div>
    );
};

export default SearchPage;
