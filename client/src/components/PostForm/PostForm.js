import React, { useRef, useState, useContext, useEffect } from "react";
import styles from "./PostForm.module.css";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import AuthContext from "../../store/auth-context";
import { useParams } from "react-router-dom";
import backendUrl from "../../backendUrl";

const PostForm = (props) => {
  const [title, setTitle] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);
  const { id } = useParams();

  const editor = useRef(null);

  const config = {
    readonly: false,
    placeholder: "Enter post content",
    hidePoweredByJodit: true,
    minHeight: 500,
    maxHeight: 500,
    buttons:
      "bold,italic,underline,strikethrough,eraser,ul,ol,font,fontsize,paragraph,classSpan,lineHeight,superscript,subscript,file,image,video,spellcheck,cut,copy,paste,selectall,copyformat,hr,table,link,symbols,indent,outdent,left,brush,undo,redo,find,source,fullsize,preview,print",
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
  const isCoverPhotoValid = (coverPhotoUrl) =>
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      coverPhotoUrl.trim(),
    );

  useEffect(() => {
    const getPostById = async () => {
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
          console.log(res);
          setTitle(res.title);
          setContent(res.content);
          setCategory(res.category);
          setCoverPhotoUrl(res.coverPhotoUrl);
        })
        .catch((err) => toast.error(err.message));
    };
    if (props.function === "edit") getPostById();
  }, []);

  useEffect(() => {
    console.log(category);
  }, [category]);

  const onFormSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isTitleValid(title)) {
      toast.error("Title can't be empty");
      setIsLoading(false);
      return;
    } else if (!isCoverPhotoValid(coverPhotoUrl)) {
      toast.error("Enter a valid URL");
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
      coverPhotoUrl: coverPhotoUrl,
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
      <form className={styles.form} onSubmit={onFormSubmitHandler}>
        <h1>
          {props.function.charAt(0).toUpperCase() + props.function.slice(1)}{" "}
          Post
        </h1>
        <label for="title">Post Title</label>
        <input
          required
          value={title}
          id="name"
          type="text"
          placeholder="Enter your post title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label for="cover-photo-url">Cover Photo URL</label>
        <input
          required
          value={coverPhotoUrl}
          id="cover-photo-url"
          type="text"
          placeholder="Enter cover photo URL"
          onChange={(e) => setCoverPhotoUrl(e.target.value)}
        />
        <label for="content">Post Content</label>
        <div>
          <JoditEditor
            id="content"
            ref={editor}
            value={content}
            config={config}
            onChange={(newContent) => setContent(newContent)}
            onBlur={(newContent) => setContent(newContent)}
            className={styles.content}
            tabIndex={1}
          />
        </div>
        <span>
          <label for="category">Category</label>
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
        <button type="submit" className={styles.submit}>
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : props.function === "create" ? (
            "Create Post"
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </>
  );
};

export default PostForm;
