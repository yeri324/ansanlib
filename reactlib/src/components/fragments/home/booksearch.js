import React, { useState } from 'react';
import BookCloud from './bookCloud';
import './booksearch.css';

function BookSearch() {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        const input = form.elements['search-input'];
        setQuery(input.value);
    };

    return (
        <div id="book-search-container" className="search">
            <nav className="search_navbar">
                <div className="navbar_container">
                    <form className="search" role="search" onSubmit={handleSearch}>
                        <input 
                            className="search_place" 
                            type="search" 
                            placeholder="검색" 
                            aria-label="Search" 
                            name="search-input"
                        />
                        <button 
                            className="search_btn" 
                            type="submit"
                        >
                            검색
                        </button>
                    </form>
                </div>
            </nav>
            <BookCloud query={query} />
        </div>
    );
}

export default BookSearch;
