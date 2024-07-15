import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminPagination.css";

const AdminPagination = ({ currentPage, totalPages, paginate }) => {
  return (
    <div className="admin-pagination">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button type="button" class="btn btn-outline-dark"
              onClick={() => paginate(currentPage - 1)}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button
                type="button"
                className={`btn ${index + 1 === currentPage ? 'btn-dark' : 'btn-outline-dark'} page-link`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button type="button" class="btn btn-outline-dark"
              onClick={() => paginate(currentPage + 1)}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminPagination;
