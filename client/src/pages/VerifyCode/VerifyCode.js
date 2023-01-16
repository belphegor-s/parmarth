import React, { useContext, useState } from "react";
import styles from "./VerifyCode.module.css";
import backendURl from "../../backendUrl";
import toast from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const VerifyCode = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const isCodeNotEmpty = () => verificationCode.length === 8;

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (!isCodeNotEmpty()) {
      toast.error("Enter a valid 2FA Code");
      setIsLoading(false);
      return;
    }

    await fetch(`${backendURl}/verify2FACode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        enteredCode: verificationCode.toString(),
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.error) {
          toast.error(resData.error);
        } else if (resData.token) {
          const expirationTime = new Date(
            new Date().getTime() + resData.expiresIn * 1000,
          );
          authCtx.login(
            resData.token,
            expirationTime.toISOString(),
            resData.userId,
          );
          navigate("/", { replace: true });
          toast.success("Successfully logged in");
        }
      });

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles["card"]}>
          <div className={styles.heading}>Verify 2FA Code</div>
          <form onSubmit={onSubmitHandler} className={styles["form"]}>
            <label for="verification-code" className={styles.label}>
              Verification Code
            </label>
            <input
              id="verification-code"
              type="text"
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="submit" disabled={isLoading}>
              {isLoading ? <div className={styles.loader}></div> : "Verify"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyCode;
