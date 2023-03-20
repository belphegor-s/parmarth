import React, { useState, useEffect, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import MobileNav from "../MobileNav/MobileNav";
import styles from "./Navbar.module.css";
import { RiArrowDropDownLine } from "react-icons/ri";
import AuthContext from "../../store/auth-context";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const userType = authCtx.userType;

  const [width, setWidth] = useState(window.innerWidth);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [showAdminsDropdown, setShowAdminsDropdown] = useState(false);
  const [showEventsDropdown, setShowAEventsDropdown] = useState(false);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div id="navbar" className={styles.navbar}>
      {width >= 1300 ? (
        <div className={styles.logo} onClick={() => navigate("/")}></div>
      ) : (
        <div></div>
      )}
      <div
        className={styles["nav-links"]}
        style={{
          display: width >= 1300 ? "flex" : "none",
        }}
      >
        <NavLink
          to="/"
          className={pathname === "/" ? styles.active : styles.link}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            Home
          </span>
        </NavLink>
        <NavLink
          to="/about"
          className={pathname === "/about" ? styles.active : styles.link}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            About
          </span>
        </NavLink>
        <NavLink
          to="#"
          className={pathname === "#" ? styles.active : styles.link}
          style={{ position: "relative" }}
          onMouseEnter={() => setShowAEventsDropdown(!showEventsDropdown)}
          onMouseLeave={() => setShowAEventsDropdown(!showEventsDropdown)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            Events
            <RiArrowDropDownLine size={25} />
            {showEventsDropdown && (
              <div className={styles.dropdown}>
                <ul>
                  <li>
                    <NavLink
                      to="/events"
                      className={
                        pathname === "/events" ? styles.active : styles.link
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/educational-visits"
                      className={
                        pathname === "/educational-visits"
                          ? styles.active
                          : styles.link
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Educational Visits
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/festival-celebration"
                      className={
                        pathname === "/festival-celebration"
                          ? styles.active
                          : styles.link
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Festival Celebration
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </span>
        </NavLink>
        <NavLink
          to="#"
          className={pathname === "#" ? styles.active : styles.link}
          style={{ position: "relative" }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Happenings
            <RiArrowDropDownLine size={25} />
          </span>
        </NavLink>
        <NavLink
          to="#"
          className={pathname === "#" ? styles.active : styles.link}
          style={{ position: "relative" }}
          onMouseEnter={() => setShowMoreDropdown(!showMoreDropdown)}
          onMouseLeave={() => setShowMoreDropdown(!showMoreDropdown)}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            More
            <RiArrowDropDownLine size={25} />
          </span>
          {showMoreDropdown && (
            <div className={styles.dropdown}>
              <ul>
                <li>
                  <NavLink
                    to="/articles-and-blogs"
                    className={
                      pathname === "articles-and-blogs"
                        ? styles.active
                        : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Articles and Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/request-for-certificate"
                    className={
                      pathname === "/request-for-certificate"
                        ? styles.active
                        : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Request for Certificate
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/schooling/"
                    className={
                      pathname === "/schooling/" ? styles.active : styles.link
                    }
                    style={{ fontSize: "18px" }}
                  >
                    Get RTE Data
                  </NavLink>
                </li>
                {!isLoggedIn ? (
                  <li style={{ marginTop: "1.5rem" }}>
                    <NavLink to="/login" className={styles.login}>
                      Admin Login
                    </NavLink>
                  </li>
                ) : (
                  <li style={{ marginTop: "1.5rem" }}>
                    <NavLink
                      to="/"
                      className={styles.login}
                      onClick={() => {
                        authCtx.logout();
                        toast.success("Successfully logged out");
                      }}
                    >
                      Logout
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          )}
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="#"
            className={pathname === "#" ? styles.active : styles.link}
            style={{ position: "relative" }}
            onMouseEnter={() => setShowAdminsDropdown(!showAdminsDropdown)}
            onMouseLeave={() => setShowAdminsDropdown(!showAdminsDropdown)}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Admin Options
              <RiArrowDropDownLine size={25} />
            </span>
            {showAdminsDropdown && (
              <div className={styles.dropdown}>
                <ul>
                  {(userType === "master" || userType === "teachers") && (
                    <li>
                      <NavLink
                        to="/request-received"
                        className={
                          pathname === "/request-received"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Requests Received
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" || userType === "teachers") && (
                    <li>
                      <NavLink
                        to="/add-rte-data"
                        className={
                          pathname === "/add-rte-data"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Add RTE Data
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" || userType === "teachers") && (
                    <li>
                      <NavLink
                        to="/volunteers-data"
                        className={
                          pathname === "/volunteers-data"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Get Volunteers Data
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" ||
                    userType === "teachers" ||
                    userType === "media") && (
                    <li>
                      <NavLink
                        to="/add-volunteer-data"
                        className={
                          pathname === "/add-volunteer-data"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Add Volunteer Data
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" || userType === "teachers") && (
                    <li>
                      <NavLink
                        to="/event-volunteers-data"
                        className={
                          pathname === "/event-volunteers-data"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Get Event Volunteers Data
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" ||
                    userType === "teachers" ||
                    userType === "media") && (
                    <li>
                      <NavLink
                        to="/add-event-volunteers-data"
                        className={
                          pathname === "/add-event-volunteers-data"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Add Event Volunteers Data
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" || userType === "media") && (
                    <li>
                      <NavLink
                        to="/create-post"
                        className={
                          pathname === "/create-post"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Create Post
                      </NavLink>
                    </li>
                  )}
                  {(userType === "master" ||
                    userType === "media" ||
                    userType === "teachers") && (
                    <li>
                      <NavLink
                        to="/list-posts"
                        className={
                          pathname === "/list-posts"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        List Posts
                      </NavLink>
                    </li>
                  )}
                  {userType === "master" && (
                    <li>
                      <NavLink
                        to="/create-user"
                        className={
                          pathname === "/create-user"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        Create User
                      </NavLink>
                    </li>
                  )}
                  {userType === "master" && (
                    <li>
                      <NavLink
                        to="/list-users"
                        className={
                          pathname === "/list-users"
                            ? styles.active
                            : styles.link
                        }
                        style={{ fontSize: "18px" }}
                      >
                        List Users
                      </NavLink>
                    </li>
                  )}
                  {/* <li>
                    <NavLink
                      to="/convert-url"
                      className={
                        pathname === "/convert-url"
                          ? styles.active
                          : styles.link
                      }
                      style={{ fontSize: "18px" }}
                    >
                      Convert URL
                    </NavLink>
                  </li> */}
                </ul>
              </div>
            )}
          </NavLink>
        )}
      </div>
      {width >= 1300 && (
        <div
          className={styles["iet-logo"]}
          onClick={() => window.open("https://ietlucknow.ac.in/", "_blank")}
        ></div>
      )}

      {/* Mobile Hamburger Menu */}
      {width < 1300 && (
        <div style={{ display: "flex" }}>
          <div
            className={styles.logo}
            onClick={() => navigate("/")}
            style={{ marginRight: "1rem" }}
          ></div>
          <div
            className={styles["iet-logo"]}
            onClick={() => window.open("https://ietlucknow.ac.in/", "_blank")}
          ></div>
        </div>
      )}
      {width < 1300 && <MobileNav />}
    </div>
  );
};

export default Navbar;
