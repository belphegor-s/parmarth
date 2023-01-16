import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Events.module.css";
import Masonry from "react-masonry-css";
import backendUrl from "../../backendUrl";
import PostCard from "../../components/PostCard/PostCard";
import toast from "react-hot-toast";
import Pagination from "../../components/Pagination/Pagination";

const Events = () => {
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
    getData(`${backendUrl}/getPostByCategory/event`);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles["page-desc"]}>
          It's not the events that we create but the meaning that we attach to
          those events. At परमार्थ, we organise a set of events from time to
          time that are meant to serve purpose of bringing positive change in
          society. Certain events are organised on a regular basis and some
          events are organised whenever we feel a requirement of same.
        </div>
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
            apiUrl={`${backendUrl}/getPostByCategory/event`}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Events;
