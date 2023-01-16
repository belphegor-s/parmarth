import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./FestivalCelebration.module.css";
import PostCard from "../../components/PostCard/PostCard";
import backendUrl from "../../backendUrl";
import Masonry from "react-masonry-css";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination/Pagination";

const FestivalCelebration = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (url) => {
    setIsLoading(true);

    await fetch(url)
      .then((res) => {
        if (res.status !== 200) {
          return [];
        }
        return res.json();
      })
      .then((resData) => {
        if (!resData || !resData?.posts) {
          toast.error("Failed to load Posts");
        }
        setData(resData);
      })
      .catch((err) => toast.error(err.message));

    setIsLoading(false);
  };

  useEffect(() => {
    getData(`${backendUrl}/getPostByCategory/festival-celebration`);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>Festival Celebration</h1>
        <hr className={styles.hr} />
        <Masonry
          breakpointCols={{
            default: data?.posts?.length >= 3 ? 3 : 2,
            1100: 2,
            768: 1,
          }}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            data?.posts?.map((item) => <PostCard key={item._id} data={item} />)
          )}
        </Masonry>
        {!isLoading && (
          <Pagination
            data={data}
            fetchData={getData}
            apiUrl={`${backendUrl}/getPostByCategory/educational-visit`}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default FestivalCelebration;
