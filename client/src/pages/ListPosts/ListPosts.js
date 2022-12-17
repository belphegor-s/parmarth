import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./ListPost.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import backendUrl from "../../backendUrl";

const ListPost = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getPosts`)
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load Posts");
          }
          setData(res);
        })
        .catch((err) => toast.error(err.message));
      setIsLoading(false);
    };
    getPosts();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <h1>List of Posts</h1>
        <div>
          <div className={styles.total}>
            <strong>Total Entries:</strong> {data.length}
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
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AiFillEdit style={{ marginRight: "0.5rem" }} />
                    Edit Post
                  </div>
                </th>
                <th>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <AiFillDelete style={{ marginRight: "0.5rem" }} />
                    Delete Post
                  </div>
                </th>
              </tr>
              {data.length !== 0 ? (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.title}</td>
                    <td>{res.category}</td>
                    <td>
                      {new Date(res.createdAt)
                        .toLocaleDateString([], {
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
                        .toLocaleDateString([], {
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
                        onClick={() => navigate(`/post/${res._id}`)}
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
                        onClick={async () => {
                          await fetch(`${backendUrl}/deletePost/` + res._id, {
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
                              } else if (resData.message) {
                                toast.success(resData.message);
                                setData(
                                  data.filter((data) => data._id !== res._id)
                                );
                              }
                            })
                            .catch((err) => console.log(err));
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
      </div>
      <Footer />
    </>
  );
};

export default ListPost;
