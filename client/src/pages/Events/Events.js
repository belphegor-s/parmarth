import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Events.module.css";
import Masonry from "react-masonry-css";
import backendUrl from "../../backendUrl";
import PostCard from "../../components/PostCard/PostCard";

const Events = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetch(`${backendUrl}/getPostByCategory/event`);
      const resData = await res.json();
      setData(resData);
      setIsLoading(false);
    })();
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

export default Events;
