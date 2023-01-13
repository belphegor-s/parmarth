import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./ArticlesAndBlogs.module.css";
import PostCard from "../../components/PostCard/PostCard";
import backendUrl from "../../backendUrl";
import Masonry from "react-masonry-css";

const ArticlesAndBlogs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const articleRes = await fetch(`${backendUrl}/getPostByCategory/article`);
      const articleData = await articleRes.json();

      const blogRes = await fetch(`${backendUrl}/getPostByCategory/blog`);
      const blogData = await blogRes.json();

      setData(
        [...articleData, ...blogData].sort(
          (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
        ),
      );
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>Articles and Blogs</h1>
        <hr className={styles.hr} />
        <Masonry
          breakpointCols={{
            default: 3,
            1100: 2,
            768: 1,
          }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            data.map((item) => <PostCard key={item._id} data={item} />)
          )}
        </Masonry>
      </div>
      <Footer />
    </>
  );
};

export default ArticlesAndBlogs;
