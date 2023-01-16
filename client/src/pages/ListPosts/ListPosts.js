import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./ListPost.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";
import Modal from "../../components/Modal/Modal";
import { AiFillDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination/Pagination";

const ListPost = () => {
  const [data, setData] = useState({ posts: [] });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [postToBeDeleted, setPostToBeDeleted] = useState("");
  const [modalState, setModalState] = useState(false);
  const authCtx = useContext(AuthContext);

  const getPosts = async (url) => {
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
    getPosts(`${backendUrl}/getPosts?page=1`);
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>List of Posts</h1>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data?.totalPosts}
          </div>
          <div style={{ overflowX: "auto" }}>
            <table>
              <tr>
                <th>S. No.</th>
                <th>Post Title</th>
                <th>Category</th>
                <th>Created At</th>
                <th>Last Updated</th>
                <th>Show Post</th>
                <th>Edit Post</th>
                <th>Delete Post</th>
              </tr>
              {data?.posts?.length !== 0 ? (
                data?.posts?.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.title}</td>
                    <td>{res.category}</td>
                    <td>
                      {new Date(res.createdAt)
                        .toLocaleDateString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase()}
                    </td>
                    <td>
                      {new Date(res.lastUpdated)
                        .toLocaleDateString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                        .toUpperCase()}
                    </td>
                    <td>
                      <button
                        onClick={() => navigate(`/${res.category}/${res._id}`)}
                        className={styles.button}
                      >
                        Show Post
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.button}
                        onClick={() => navigate(`/edit-post/${res._id}`)}
                      >
                        Edit Post
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles["delete-button"]}
                        onClick={() => {
                          setPostToBeDeleted(res._id);
                          setModalState(true);
                        }}
                      >
                        Delete Post
                      </button>
                    </td>
                  </tr>
                ))
              ) : isLoading ? (
                <td colspan={8}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                <td colspan={8}>
                  <h2>No Data to show</h2>
                </td>
              )}
            </table>
          </div>
        </div>
        {!isLoading && (
          <Pagination
            data={data}
            fetchData={getPosts}
            apiUrl={`${backendUrl}/getPosts`}
          />
        )}
      </div>
      <Modal
        open={modalState}
        onClose={() => {
          setModalState(false);
          setPostToBeDeleted("");
        }}
        onConfirm={async () => {
          setIsDeleting(true);
          await fetch(`${backendUrl}/deletePost/` + postToBeDeleted, {
            headers: {
              Authorization: "Bearer " + authCtx.token,
              "Content-Type": "application/json",
            },
            method: "DELETE",
          })
            .then((res) => res.json())
            .then((resData) => {
              if (resData.error) {
                toast.error(resData.error);
                setIsDeleting(false);
                setModalState(false);
              } else if (resData.message) {
                toast.success(resData.message);
                setIsDeleting(false);
                setModalState(false);
                getPosts();
              }
            })
            .catch((err) => console.log(err));
        }}
        isLoading={isLoading}
      >
        {isDeleting ? (
          <div
            className={styles.loader}
            style={{ marginBottom: "2.5rem" }}
          ></div>
        ) : (
          <>
            <span className={styles["delete-btn"]}>
              <AiFillDelete />
            </span>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "600",
                color: "#db1b1b",
              }}
            >
              Confirm Delete
            </div>
            <p
              style={{
                color: "#db1b1b",
              }}
            >
              This Operation is irreversible
            </p>
            <br />
          </>
        )}
      </Modal>
      <Footer />
    </>
  );
};

export default ListPost;
