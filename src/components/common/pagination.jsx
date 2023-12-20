import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

// Pagination Component
const Pagination = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  //Math.ceil converts floating point numbers to upper integer
  const pagesCount = Math.ceil(itemsCount / pageSize);
  // Return null if there's only one page
  if (pagesCount === 1) return null;
  //Creates an array of page numbers using lodash's _.range function.
  //It generates an array starting from 1 up to pagesCount (inclusive).
  const pages = _.range(1, pagesCount + 1);

  // Render the pagination
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Type checking for Props
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
