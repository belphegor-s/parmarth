import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./EditPost.module.css";
import PostForm from "../../components/PostForm/PostForm";

const EditPost = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <PostForm function="edit" />
      </div>
      <Footer />
    </>
  );
};

export default EditPost;
