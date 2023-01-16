import React from "react";
import styles from "./Classes.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Classes = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.content} style={{ marginTop: "2rem" }}>
          <img src="/img/teaching.jpg" alt="" />
          <hr className={styles.hr} />
          <h1>History</h1>
          <p>
            Well-structured LT classes of today, dates its foundation 4 years
            back. Some enthusiastic students of college, when felt plight of
            little souls residing in slums and begging on roads, led foundation
            of the club in 2015. In the initiation phase they use to visit the
            slum and teach kid there on the ground. Struggle was real in making
            slum dwellers feel the importance of education. But they succeeded
            through their tireless efforts of changing the scenario. More
            parents started sending their kids to us for basic learning. Later
            on, resected Director of Institute provided us the permission of
            Lecture Theatres (LTs). Journey rolled on and today more than 150
            slum kids visit us daily in the evening in the college LTs.
            Volunteers of the club are college students in the morning and are
            teacher of those students in evening in the same lecture theatres.
          </p>
        </div>
        <div className={styles.content}>
          <img src="/img/pooja.jpg" alt="" />
          <hr className={styles.hr} />
          <h1>Modus Operandi</h1>
          <p>
            Now LT classes are well structured and well-organized classes. More
            than 150 students visit us on a daily basis for their free
            education. College students are their teachers and caretakers in the
            college campus. Nearly 200 volunteers are associated with LT
            functioning every academic year. Every small thing is scheduled to
            minimize chaos and maximize output with efforts that they can put
            along with their studies. Volunteers are from different streams of
            B.tech, MBA and MCA. Turn of each stream is scheduled only a day per
            week. Everyday nearly 25 volunteers visit for LT teachings. Their
            next turn will be scheduled on next week, each turn is of 2 to 3
            hours, so, Parmarth demand only 2 to 3 hours of a volunteer per
            week, thus not putting any academic burden. Children are divided in
            5 groups as per their mental level and a different LT is assigned
            for each group. Books are designed especially for each group
            considering the mental level of students. Beside this, a separate
            group is also formed, named Group JNV, to help slum students in
            preparation of JNV entrance test. Competitive books are provided to
            student of this group. Each group has a group in-charge who monitor
            all functioning of their respective groups.
          </p>
        </div>

        <div className={styles.tools}>
          <h1>Tools used in Classes</h1>
          <div className={styles["tool-left"]}>
            <div>
              <h2>Books</h2>
              <p>
                Separate books are designed for each group and each subject.
                Books assist volunteers and also maintain concurrency of topic
                as turn of each volunteer is scheduled only once a week.
              </p>
            </div>
            <img src="/img/books.jpg" alt="" />
          </div>
          <div className={styles["tool-right"]}>
            <div>
              <h2>Stationery</h2>
              <p>
                Stationeries are provided to them from the club fund to assist
                their studies. Slate and sketches are provided to youngest kids
                while pencils and copies are provided to higher groups.
              </p>
            </div>
            <img src="/img/stationery.jpg" alt="" />
          </div>
          <div className={styles["tool-left"]}>
            <div>
              <h2>Homework</h2>
              <p>
                Homework is given to them on a daily basis and is checked the
                next following day.
              </p>
            </div>
            <img src="/img/homework.jpg" alt="" />
          </div>
          <div className={styles["tool-right"]}>
            <div>
              <h2>Projectors and Speakers</h2>
              <p>
                Nothing beat visual presentation of topics. While we play
                stories and poems on projector in lower groups, we use it for
                visualizing science and other topics in the higher groups.
              </p>
            </div>
            <img src="/img/projector.jpg" alt="" />
          </div>
          <div className={styles["tool-left"]}>
            <div>
              <h2>Learn with Fun</h2>
              <p>
                Certain fun activities are also organized for them so that they
                can learn lot from it more creatively. A special slot of Sunday
                is reserved for such activities
              </p>
            </div>
            <img src="/img/fun.jpg" alt="" />
          </div>
          <div className={styles["tool-right"]}>
            <div>
              <h2>Special Sessions</h2>
              <p>
                Sessions are organized on certain important topics such as
                cleanliness, career opportunities for them and a lot other to
                broaden their minds.
              </p>
            </div>
            <img src="/img/session.jpg" alt="" />
          </div>
          <div className={styles["tool-left"]}>
            <div>
              <h2>Tests</h2>
              <p>
                Regular tests are conducted at finite intervals so as to measure
                our progress and to make our teaching techniques more effective.
                Prizes are also distributed to motivate them toward studies.
              </p>
            </div>
            <img src="/img/test.jpg" alt="" />
          </div>
        </div>
        <div className={styles["a-day-in-lt"]}>
          <h1>A day in LT</h1>
          <p>
            Every day in LT teaching starts from 4 pm in evening. Volunteers go
            to slums and bring the students in the college campus. Once we have
            received the students from their shelters, thereafter it's our
            responsibility to safely take them with us, teach them, take care of
            them and safely dropping them back.
            <br />
            <br />
            Children and volunteers gather around 4:45 pm in the LT complex. LT
            starts with assembly prayer and National Anthem. Thereafter children
            and volunteers move to their respective groups. Homework of previous
            day is checked before any further teaching. Lower groups involve one
            to one teaching, whereas volunteers teach on blackboards in the
            higher groups.
            <br />
            <br />
            Group JNV also involve one to one teaching. Daily attendance of both
            volunteers and kids are taken. Detail of each day is also updated in
            Club's WhatsApp group along with the homework given to each group
            that day, so that volunteers of next day can tune in. Around 6:30 in
            evening, volunteers drop back kids to their shelters, and a day of
            LT teaching has been done.
          </p>
          <img src="/img/prayer.jpg" alt="" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Classes;
