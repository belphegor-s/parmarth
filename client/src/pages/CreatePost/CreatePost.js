import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./CreatePost.module.css";
import PostForm from "../../components/PostForm/PostForm";

const CreatePost = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <PostForm function="create" />
      </div>
      <Footer />
    </>
  );
};

export default CreatePost;
