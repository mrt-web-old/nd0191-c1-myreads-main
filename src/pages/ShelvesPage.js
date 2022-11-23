import { Link } from 'react-router-dom'
import Shelf from '../components/Shelf';
import { shelves } from '../constants/shelves'
import React from 'react';
import PropTypes from 'prop-types';

const ShelvesPage = ({ books, onChange }) => {
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>

            <div className="list-books-content">
                <div>
                    {
                        shelves.map(e => <Shelf key={e.value} shelf={e} books={books} onChange={onChange} />)
                    }
                </div>
            </div>

            <div className="open-search">
                <Link to='/search'>Add a book</Link>
            </div>
        </div>
    );
};

ShelvesPage.propTypes={
    books: PropTypes.array.isRequired, 
    onChange: PropTypes.func.isRequired
};
export default ShelvesPage;