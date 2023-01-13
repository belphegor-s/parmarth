import React, { useContext, useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./ConvertUrl.module.css";
import backendURl from "../../backendUrl";
import { toast } from "react-hot-toast";
import AuthContext from "../../store/auth-context";

const ConvertUrl = () => {
  const [url, setUrl] = useState("");
  const [convertedUrl, setConvertedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await fetch(`${backendURl}/getImgUrl`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authCtx.token,
      },
      body: JSON.stringify({
        imgUrl: url,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
          return;
        }
        setConvertedUrl(resData.coverImageUrl);
      })
      .catch((err) => toast.error(err.message));

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles["card"]}>
          <div className={styles.heading}>Convert Image URL</div>
          <form onSubmit={onSubmitHandler} className={styles["form"]}>
            <label for="url" className={styles.label}>
              Enter URL
            </label>
            <input
              id="url"
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              required
            />
            <button type="submit">
              {isLoading ? <div className={styles.loader}></div> : "Convert"}
            </button>
          </form>
        </div>
        {convertedUrl !== "" && (
          <div className={styles.output}>
            {convertedUrl}
            <button
              onClick={() => {
                navigator.clipboard.writeText(convertedUrl);
                toast.success("Copied to Clipboard");
              }}
            >
              Copy
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ConvertUrl;
