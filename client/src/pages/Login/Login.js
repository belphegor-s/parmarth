import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import { toast, Toaster } from "react-hot-toast";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import backendUrl from "../../backendUrl";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isPasswordValid = (password) => password.length >= 8;

  const loginButtonClickHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isEmailValid(email)) {
      toast.error("Enter a valid email");
      setIsLoading(false);
      return;
    }

    if (!isPasswordValid(password)) {
      toast.error("Password should be at least 8 characters");
      setIsLoading(false);
      return;
    }

    await fetch(`${backendUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
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
        } else if (
          resData.message === "Successfully sent 2FA code to email" &&
          resData.userId
        ) {
          toast.success(resData.message);
          localStorage.setItem("userId", resData.userId);
          navigate("/verify-code", { replace: true });
        }
      })
      .catch((err) => toast.error(err.message));

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles["login-card"]}>
          <div className={styles.heading}>Admin Login</div>
          <form
            className={styles["login-form"]}
            onSubmit={loginButtonClickHandler}
          >
            <label for="email" className={styles.label}>
              Email
            </label>
            <input
              type="text"
              placeholder="Enter your email"
              id="email"
              className={styles["login-inputs"]}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label for="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              title="password"
              className={styles["login-inputs"]}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className={styles['test-credentials']}>
              <p>Test Credentials 👇</p>
              <p>Email: admin@parmarth.com</p>
              <p>Password: Muskan^^</p>
            </div>
            <button className={styles["login-btn"]} type="submit">
              {isLoading ? <div className={styles.loader}></div> : "Log in"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <Toaster />
    </>
  );
};

export default Login;
