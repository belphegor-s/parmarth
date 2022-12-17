import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Post.module.css";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import backendUrl from "../../backendUrl";

const Post = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const getPostById = () => {
    setIsLoading(true);
    fetch(`${backendUrl}/getPost/` + id)
      .then((res) => {
        if (res.status !== 200) {
          return [];
        }
        return res.json();
      })
      .then((res) => {
        if (res === []) {
          toast.error("Failed to load Post");
          return;
        }
        setData(res);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  };

  useEffect(getPostById, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        {isLoading ? (
          <div className={styles.loader}></div>
        ) : (
          <div className={styles.post}>
            <h1 className={styles.title}>{data.title}</h1>
            <p className={styles.category}>{data.category}</p>
            <p className={styles.category}>
              Last Updated:&nbsp;
              {new Date(data.lastUpdated).toLocaleDateString([], {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
            <button
              className={styles.edit}
              onClick={() => navigate(`/edit-post/${id}`)}
            >
              <AiFillEdit style={{ marginRight: "0.5rem" }} />
              Edit Post
            </button>
            <div
              dangerouslySetInnerHTML={{ __html: data.content }}
              style={width < 768 ? null : { padding: "0 4rem" }}
            ></div>
          </div>
        )}
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Post;
