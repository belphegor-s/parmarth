import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Post.module.css";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import backendUrl from "../../backendUrl";
import categoryMap from "../../data/categoryMap.json";
import AuthContext from "../../store/auth-context";

const Post = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

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
          setIsLoading(false);
          return;
        }
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
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
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles["post-info"]}>
              <p className={styles.category}>
                <strong>Category:</strong> {categoryMap[data?.category]}
              </p>
              <p className={styles.category}>
                <strong>Last Updated:</strong>&nbsp;
                {new Date(data?.lastUpdated).toLocaleDateString([], {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            {authCtx.isLoggedIn && (
              <button
                className={styles.edit}
                onClick={() => navigate(`/edit-post/${id}`)}
              >
                <AiFillEdit style={{ marginRight: "0.5rem" }} />
                Edit Post
              </button>
            )}
            <img src={data?.coverPhotoUrl} alt="" />
            <div
              dangerouslySetInnerHTML={{ __html: data?.content }}
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
