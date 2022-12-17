import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./CreateUser.module.css";
import toast from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import backendUrl from "../../backendUrl";

const CreateUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isPasswordValid = (password) => password.length >= 8;
  const isPasswordSame = () => password === confirmPassword;

  const createUserClickHandler = async (e) => {
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

    if (!isPasswordSame()) {
      toast.error("Password does not match");
      setIsLoading(false);
      return;
    }

    await fetch(`${backendUrl}/createUser`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
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
        } else if (resData.message) {
          toast.success(resData.message);
        }
      })
      .catch((err) => toast.error(err.message));

    setIsLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <form className={styles.form} onSubmit={createUserClickHandler}>
          <h1>Create an Admin User</h1>
          <label for="email" className={styles.label}>
            Email
          </label>
          <input
            type="text"
            placeholder="Enter your email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label for="password" className={styles.label}>
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            title="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label for="confirm-password" className={styles.label}>
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            title="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button className={styles.submit} type="submit">
            {isLoading ? <div className={styles.loader}></div> : "Create User"}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateUser;
