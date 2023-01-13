import React from "react";
import styles from "./Footer.module.css";
import {
  BsTwitter,
  BsInstagram,
  BsLinkedin,
  BsFacebook,
  BsYoutube,
} from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <div className={styles["vision-and-mission"]}>
          <div className={styles.heading}>Vision and Mission</div>
          <div style={{ width: "300px" }}>
            <ul>
              <li>
                Poverty can't stop children to fly with wings of belief, care
                and support.
              </li>
              <li>
                Dedicated to upgrade the standards of Living, Education and
                Quality of life of children living in the slums.
              </li>
              <li>
                Educate and Ensure and every child living in the slum area will
                go to School.
              </li>
              <li>
                To create awareness among the parents of underprivileged
                children about their rights and Government programmes for their
                welfare.
              </li>
              <li>
                Education and Empowerment of Women and Girls living in the
                slums.
              </li>
            </ul>
          </div>
        </div>
        <div className={styles["contact-us"]}>
          <div className={styles.heading}>Contact Us</div>
          <div>
            <div className={styles["contact-field"]}>
              <div className={styles["contact-icons"]}>
                <IoLocationSharp style={{ fontSize: "1.4rem" }} />
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                  Working Place
                </div>
                <div>
                  Institute of Engineering and <br />
                  Technology,Lucknow ,226021
                </div>
              </div>
            </div>
            <div className={styles["contact-field"]}>
              <div className={styles["contact-icons"]}>
                <FaPhone style={{ fontSize: "1.4rem" }} />
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                  Phone Number
                </div>
                <div>
                  +91 9455333205
                  <br />
                  +91 9519195737
                </div>
              </div>
            </div>
            <div className={styles["contact-field"]}>
              <div className={styles["contact-icons"]}>
                <MdEmail style={{ fontSize: "1.4rem" }} />
              </div>
              <div style={{ marginLeft: "1rem" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>
                  Email
                </div>
                <a href="mailto:ietparmarth@gmail.com">ietparmarth@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.social}>
          <div className={styles.heading}>Follow Us</div>
          <br />
          <div>
            <a
              href="https://www.facebook.com/parmarth.iet/"
              rel="noreferrer"
              target="_blank"
              className={styles["link"]}
            >
              <BsFacebook className={styles.icon} style={{ paddingLeft: 0 }} />
            </a>
            <a
              href="https://twitter.com/ietparmarth?lang=en"
              rel="noreferrer"
              target="_blank"
              className={styles["link"]}
            >
              <BsTwitter className={styles.icon} />
            </a>
            <a
              href="https://www.instagram.com/parmarth.iet/"
              rel="noreferrer"
              target="_blank"
              className={styles["link"]}
            >
              <BsInstagram className={styles.icon} />
            </a>
            <a
              href="https://in.linkedin.com/company/parmarth-iet"
              rel="noreferrer"
              target="_blank"
              className={styles["link"]}
            >
              <BsLinkedin className={styles.icon} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCy66KqRs1rKSHXNVdLFSO7Q"
              rel="noreferrer"
              target="_blank"
              className={styles["link"]}
            >
              <BsYoutube className={styles.icon} style={{ paddingRight: 0 }} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.copyright}>
        Parmarth © 2023 All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
