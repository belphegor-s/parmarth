import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./PostForm.module.css";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import AuthContext from "../../store/auth-context";
import { useParams } from "react-router-dom";
import backendUrl from "../../backendUrl";
import Resizer from "react-image-file-resizer";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const { id } = useParams();

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter post content",
    hidePoweredByJodit: true,
    minHeight: 500,
    maxHeight: 500,
    uploader: { insertImageAsBase64URI: true },
    buttons:
      "bold,italic,underline,strikethrough,ul,ol,align,fontsize,brush,font,paragraph,lineHeight,superscript,subscript,image,video,table,link,symbols,indent,outdent,preview",
  };

  const isTitleValid = (title) => title.trim().length > 0;
  const isContentValid = (content) => content.trim().length > 0;
  const isCategoryValid = () => {
    switch (category) {
      case "blog":
      case "event":
      case "medical-helps":
      case "article":
      case "donation":
      case "educational-visit":
      case "festival-celebration":
        return true;

      default:
        return false;
    }
  };
  const isCoverPhotoValid = (coverPhoto) => coverPhoto.length > 0;

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  useEffect(() => {
    const getPostById = async () => {
      setIsPostLoading(true);
      await fetch(`${backendUrl}/getPost/` + id)
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load Post Data");
          }
          setTitle(res.title);
          setDescription(res.description);
          setContent(res.content);
          setCategory(res.category);
          setCoverPhoto(res.coverPhotoUrl);
        })
        .catch((err) => toast.error(err.message));
      setIsPostLoading(false);
    };
    if (props.function === "edit") getPostById();
  }, []);

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isTitleValid(title)) {
      toast.error("Title can't be empty");
      setIsLoading(false);
      return;
    } else if (!isCoverPhotoValid(coverPhoto)) {
      toast.error("Select a file");
      setIsLoading(false);
      return;
    } else if (!isContentValid(content)) {
      toast.error("Enter at least some characters in content");
      setIsLoading(false);
      return;
    } else if (!isCategoryValid(category)) {
      toast.error("Select a valid category");
      setIsLoading(false);
      return;
    }

    const data = {
      title: title,
      description: description || "",
      coverPhotoUrl: coverPhoto,
      content: content,
      category: category,
    };

    if (props.function === "create") {
      await fetch(`${backendUrl}/addPost`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          if (resData.error) {
            toast.error(resData.error);
          } else if (resData.message) {
            toast.success(resData.message);
          }
        })
        .catch((err) => toast.error(err.message));
    } else if (props.function === "edit") {
      await fetch(`${backendUrl}/editPost/` + id, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + authCtx.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((resData) => {
          if (resData.error) {
            toast.error(resData.error);
          } else if (resData.message) {
            toast.success(resData.message);
          }
        })
        .catch((err) => toast.error(err.message));
    }

    setIsLoading(false);
  };

  return (
    <>
      {isPostLoading ? (
        <div className={styles["loader-form"]}></div>
      ) : (
        <form className={styles.form} onSubmit={onFormSubmitHandler}>
          <h1>
            {props.function.charAt(0).toUpperCase() + props.function.slice(1)}{" "}
            Post
            <br />
            <span
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "red",
              }}
            >
              NOTE: Make sure not to upload large size Images
            </span>
          </h1>
          <label for="title">
            Post Title <span style={{ color: "red" }}>*</span>
          </label>
          <input
            required
            value={title}
            id="title"
            type="text"
            placeholder="Enter your post title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label for="description">Description</label>
          <textarea
            id="description"
            value={description}
            placeholder="Enter your post description"
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          <label for="cover-photo">
            Cover Photo <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="file"
            id="cover-photo"
            onChange={async (e) => {
              try {
                const file = e.target.files[0];
                const image = await resizeFile(file);
                setCoverPhoto(image);
              } catch (err) {
                console.log(err);
              }
            }}
          />
          {coverPhoto && (
            <img
              src={coverPhoto}
              alt="cover"
              className={styles["cover-photo"]}
            />
          )}
          <label for="content">
            Post Content <span style={{ color: "red" }}>*</span>
          </label>
          <div>
            <JoditEditor
              id="content"
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
              onChange={(newContent) => {}}
              className={styles.content}
              tabIndex={1}
            />
          </div>
          <span>
            <label for="category">
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <select
              required
              value={category === "" ? "choose" : category}
              id="category"
              className={styles.dropdown}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option disabled hidden value="choose">
                Select Category
              </option>
              <option value="blog">Blog</option>
              <option value="event">Event</option>
              <option value="medical-helps">Medical Helps</option>
              <option value="article">Article</option>
              <option value="donation">Donation</option>
              <option value="educational-visit">Educational Visit</option>
              <option value="festival-celebration">Festival Celebration</option>
            </select>
          </span>
          <button type="submit" className={styles.submit} disabled={isLoading}>
            {isLoading ? (
              <div className={styles.loader}></div>
            ) : props.function === "create" ? (
              "Create Post"
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default PostForm;
