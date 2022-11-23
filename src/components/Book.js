import PropTypes from 'prop-types';
import ShelfSelector from './ShelfSelector';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { shelvesObj } from '../constants/shelves';

const Book = ({ bookInfo, onChange }) => {

    const imageURL = bookInfo.hasOwnProperty('imageLinks') ?
        bookInfo.imageLinks.smallThumbnail : '';
    const authors = bookInfo.hasOwnProperty('authors') ?
        bookInfo.authors : [];
    const isShelfed = () => bookInfo.hasOwnProperty('shelf') && bookInfo.shelf !== 'none';
    const path = useLocation().pathname
    const isAtSearchPage = () => path === '/search'

    const style = {
        fontWeight: isShelfed() ? 'bold' : 'unset',
        textDecoration: isShelfed() ? 'underline' : 'unset'
    };
    if (imageURL.length === 0) console.log(bookInfo, 'no image');

    return (
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 192,
                        backgroundImage:
                            `url("${imageURL}")`,
                    }}
                ></div>
                <ShelfSelector
                    shelf={bookInfo.shelf || 'none'}
                    onChange={onChange}
                    book={bookInfo}
                />
                {
                    isShelfed()
                    &&
                    isAtSearchPage()
                    &&
                    <div className='shelf-label'>
                        {shelvesObj[bookInfo.shelf]}
                    </div>
                }
            </div>

            <div
                className="book-title"
                style={style}
            >
                {bookInfo.title}
            </div>

            {authors.map(e =>
                <div key={e} className="book-authors">{e}</div>
            )}

        </div>
    )
};
Book.propTypes = {
    bookInfo: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
export default Book;