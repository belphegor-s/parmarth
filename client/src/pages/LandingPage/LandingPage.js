import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./LandingPage.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import TaskCard from "../../components/TaskCard/TaskCard";
import Footer from "../../components/Footer/Footer";
import HelpCard from "../../components/HelpCard/HelpCard";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div id="parallax" className={styles.parallax}>
        <div className={styles.parmarth} id="parallax">
          परमार्थ<span style={{ color: "#277bc0" }}>.</span>
        </div>
        <div style={{ color: "#fff", fontSize: "1.6rem" }}>
          The Social Club of IET Lucknow
        </div>
      </div>
      <div className={styles.main}>
        <div className={styles["top-section"]}>
          <div className={styles.about}>
            <div style={{ lineHeight: "1" }}>
              <div style={{ fontSize: "3rem", fontWeight: "500" }}>
                Parmarth
              </div>
              <div style={{ fontSize: "1.2rem", color: "#535353" }}>
                Since 2015
              </div>
            </div>
            <br />
            <div
              style={{
                color: "#277bc0",
                fontSize: "1.2rem",
                fontWeight: "500",
              }}
            >
              Kind words can be short and easy to speak, but their echoes are
              truly endless.
            </div>
            <br />
            <div>
              Small group of thoughtfull people can change the world and indeed
              optimism is the faith that leads to achievements." Welcome to the
              Parmarth, the social club of Institute of Engineering and
              Technology Lucknow (popularly known as IET Lucknow). It aims in
              upbringing positive change in a section of society which is often
              neglected or least cared about. A sufficiently large section of
              people of metropolitan cities reside in slums who are of least
              priority in our day to day busy schedule. Children residing in
              slums roam here and there and finally fell into deep well of
              illiteracy, unemployment, below average living standards,
              pitifulness and misery. As it is said, Children are future of
              nation, but we often tend to neglect a major portion of that
              future which never seemed so bright. At Parmarth, we put an effort
              against same. Children are like earthen pots that can be molded
              easily with a tool called education. Education has all the
              capabilities to change one's future. So, we at Parmarth try to
              shape some of them using this tool.
            </div>
          </div>

          <img
            src="img/children-studying.jpeg"
            alt="children-studying"
            className={styles.children}
          />
        </div>

        <div className={styles.carousel}>
          <div className={styles["gallery"]}>Gallery</div>
          <hr className={styles.hr} style={{ width: "30px", marginTop: "0" }} />
          <div style={{ maxWidth: "1366px" }}>
            <Carousel
              autoPlay
              infiniteLoop
              showArrows={false}
              emulateTouch
              height="500px"
              showStatus={false}
              showThumbs={false}
              transitionTime={800}
              stopOnHover={false}
            >
              <div>
                <img
                  src="img/1.jpeg"
                  alt="carousel"
                  className={styles["carousel-img"]}
                />
              </div>
              <div>
                <img
                  src="img/2.jpeg"
                  alt="carousel"
                  className={styles["carousel-img"]}
                />
              </div>
              <div>
                <img
                  src="img/3.jpg"
                  alt="carousel"
                  className={styles["carousel-img"]}
                />
              </div>
              <div>
                <img
                  src="img/4.jpeg"
                  alt="carousel"
                  className={styles["carousel-img"]}
                />
              </div>
              <div>
                <img
                  src="img/5.jpeg"
                  alt="carousel"
                  className={styles["carousel-img"]}
                />
              </div>
              <div>
                <img
                  src="img/6.jpeg"
                  alt="carousel"
                  className={styles["carousel-img"]}
                />
              </div>
            </Carousel>
          </div>
        </div>
        <div className={styles.works}>
          <div className={styles["our-wings"]}>Our Wings</div>
          <div style={{ color: "#535353" }}>
            We Operate our task in four categories
          </div>
          <hr className={styles.hr} />
          <div className={styles.tasks}>
            <TaskCard task="Classes" imgUrl="img/classes.png" url="/classes" />
            <TaskCard task="Girls Education" imgUrl="img/girls-education.png" />
            <TaskCard
              task="Schooling"
              imgUrl="img/schooling.png"
              url="/schooling"
            />
            <TaskCard task="Social Service" imgUrl="img/social-service.png" />
          </div>
        </div>
        <div className={styles.works}>
          <div className={styles["our-wings"]}>How could you help</div>
          <hr className={styles.hr} />
          <div className={styles.help}>
            <HelpCard
              src="/img/donate.png"
              title="Give Donation"
              description="Happiness doesn’t result from what we get, but from what we give."
            />
            <HelpCard
              src="/img/sponsor.png"
              title="Sponsor a child"
              description="Multiply is rule light dominion given midst a living i set every bring also of rule Set light fifth best bearing."
            />
            <HelpCard
              src="/img/medical.png"
              title="Medical Help"
              description="As we lose ourselves in the service of others, we discover our own lives and our own happiness."
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
