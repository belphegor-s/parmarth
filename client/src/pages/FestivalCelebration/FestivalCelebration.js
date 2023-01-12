import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./FestivalCelebration.module.css";
import PostCard from "../../components/PostCard/PostCard";
import backendUrl from "../../backendUrl";

const FestivalCelebration = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const res = await fetch(
        `${backendUrl}/getPostByCategory/festival-celebration`,
      );
      const resData = await res.json();
      setData(resData);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>Festival Celebration</h1>
        <hr className={styles.hr} />
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          data.map((item) => <PostCard key={item._id} data={item} />)
        )}
      </div>
      <Footer />
    </>
  );
};

export default FestivalCelebration;
