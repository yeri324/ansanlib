import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPagination.css";

const AdminPagination = ({ currentPage, totalPages, paginate }) => {
  const maxPagesToShow = 10;
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="admin-pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center" id="admin-page-center">
          <li id="admin-page-item" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="btn btn-outline-dark" id="admin-pre"
              onClick={() => paginate(1)}
              aria-label="First"
            >
              <span aria-hidden="true">&laquo;&laquo;</span>
            </button>
          </li>
          <li id="admin-page-item" className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="btn btn-outline-dark" id="admin-pre"
              onClick={() => paginate(Math.max(startPage - maxPagesToShow, 1))}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {pages.map((page) => (
            <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
              <button
                id="admin-next"
                className={`btn ${page === currentPage ? 'btn-dark' : 'btn-outline-dark'} page-link`}
                onClick={() => paginate(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li id="admin-page-item" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button type="button" className="btn btn-outline-dark"
              onClick={() => paginate(Math.min(endPage + 1, totalPages))}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
          <li id="admin-page-item" className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="btn btn-outline-dark" id="admin-next"
              onClick={() => paginate(totalPages)}
              aria-label="Last"
            >
              <span aria-hidden="true">&raquo;&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPagination;
