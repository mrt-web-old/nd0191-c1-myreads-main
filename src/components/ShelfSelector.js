import { shelves } from '../constants/shelves';
import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'


const ShelfSelector = ({ shelf, book, onChange }) => {

    const path = useLocation().pathname;

    return (
        <div className="book-shelf-changer">
            <select onChange={evt => onChange(book, evt.target.value, path)} value={shelf}>
                <option value="none" disabled>Move to...</option>
                {
                    shelves.map(e =>
                        <option key={e.value} value={e.value} >
                            {e.text}
                        </option>
                    )
                }
                <option value="none" >None</option>
            </select>
        </div>
    );
};

ShelfSelector.propTypes = {
    shelf: PropTypes.string.isRequired,
    book: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};
export default ShelfSelector;