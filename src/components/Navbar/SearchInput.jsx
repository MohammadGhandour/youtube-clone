import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchInput() {

    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (searchTerm) {
            navigate(`/search/${searchTerm}`);
            setSearchTerm('');
        }
    }

    return (
        <form onSubmit={handleSubmit} className='flex-center search-form'>
            <input
                type='text'
                className='search-input'
                placeholder='Search'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type='submit' className='search-button flex-center'>
                <i className='fa-solid fa-search'></i>
            </button>
        </form>
    )
}

export default SearchInput;
