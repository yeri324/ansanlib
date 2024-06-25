import React from "react";
import './booksearch.css';


function BookSearch() {

    return (
        <div className="search">
                <nav className="search_navbar">
                  <div className="navbar_container">
                    <form className="search" role="search">
                      <input className="search_place" type="search" placeholder="검색" aria-label="Search" />
                      <button className="search_btn" type="submit">검색</button>
                    </form>
                  </div>
                </nav>
              </div>

    );
}


export default BookSearch;