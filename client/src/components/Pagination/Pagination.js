import React from "react";
import styles from "./Pagination.module.css";

const Pagination = ({ data, fetchData, apiUrl }) => {
  return (
    <section className={styles.pagination}>
      <button
        onClick={() => {
          fetchData(`${apiUrl}?page=1`);
        }}
        className={data.currentPage === 1 ? styles.active : ""}
      >
        First Page
      </button>
      {data.hasPreviousPage && (
        <button
          onClick={() => {
            fetchData(`${apiUrl}?page=${data.previousPage}`);
          }}
        >
          {data.previousPage}
        </button>
      )}
      <button
        onClick={() => {
          fetchData(`${apiUrl}?page=${data.currentPage}`);
        }}
        className={styles.active}
      >
        {data.currentPage}
      </button>
      {data.hasNextPage && (
        <button
          onClick={() => {
            fetchData(`${apiUrl}?page=${data.nextPage}`);
          }}
        >
          {data.nextPage}
        </button>
      )}
      <button
        onClick={() => {
          fetchData(`${apiUrl}?page=${data.lastPage}`);
        }}
        className={data.currentPage === data.lastPage ? styles.active : ""}
      >
        Last Page
      </button>
    </section>
  );
};

export default Pagination;
