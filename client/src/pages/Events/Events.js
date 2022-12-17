import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import styles from "./Events.module.css";
import EventsCard from "../../components/EventsCard/EventsCard";
import Masonry from "react-masonry-css";

const Events = () => {
  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles["page-desc"]}>
          It's not the events that we create but the meaning that we attach to
          those events. At परमार्थ, we organise a set of events from time to
          time that are meant to serve purpose of bringing positive change in
          society. Certain events are organised on a regular basis and some
          events are organised whenever we feel a requirement of same.
        </div>
        <hr className={styles.hr} />

        <Masonry
          breakpointCols={{
            default: 3,
            1100: 2,
            768: 1,
          }}
          className={styles["my-masonry-grid"]}
          columnClassName={styles["my-masonry-grid_column"]}
        >
          <EventsCard
            src="/img/beggers.jpg"
            title="Beggar's Event"
            description="It is organised whenever we feel a strong requirement of it. It is 3-4 days long event in which we try to convert child beggars into our students. On day 1,we gather them all, give them food and teach a little. Subsequently we decrease amount of food and increase amount of study. In last day of event, we give no food and only make them to study. In this way, an interest for study is developed in them."
          />
          <EventsCard
            src="/img/cloth.jpeg"
            title="Cloth distribution event - 'Muskaan'"
            description="It is organised whenever we feel a strong requirement of it. It is 3-4 days long event in which we try to convert child beggars into our students. On day 1,we gather them all, give them food and teach a little. Subsequently we decrease amount of food and increase amount of study. In last day of event, we give no food and only make them to study. In this way, an interest for study is developed in them."
          />
          <EventsCard
            src="/img/clean.jpeg"
            title="Cleanliness Event"
            description="It is organised every year on 2nd of October, Gandhi Jayanti. A cleanliness drive is organised in slum where volunteers themselves clean the slum and motivate slum dwellers for cleanliness and hygiene. Importance of cleanliness and how diseases can be prevented are told to slum dwellers."
          />
          <EventsCard
            src="/img/blood.jpeg"
            title="Blood donation event"
            description="It is organised every year. Team of doctors along with all equipments are called upon and students of our college donate their precious blood that can be priceless someday for somebody in need."
          />
          <EventsCard
            src="/img/4.jpeg"
            title="Cultural Events"
            description="Every year we organise certain cultural events of our children in college fest such as Convergence and Encore with aim of improving their overall personalities. Their performance in fests are one among the most awaited ones."
          />
          <EventsCard
            src="/img/udgam.jpeg"
            title="Foundation event 'Udgam'"
            description="It is organised on 6th of September every year to mark the day when foundation of club had been laid. It is celebrated with cake cutting, fun activities, fun games and small competitions among children."
          />
          <EventsCard
            src="/img/5.jpeg"
            title="Children's Day Celebration"
            description="It is organised on 14th of November every year to celebrate the special gift i.e children that we have got and feel special having them.Usually we have First women of Uttar Pradesh Technical University, Mrs. Vandana Pathak Mam, wife of respected Vice Chancellor Sir and First women of College, wife of respected Director Sir as Guest of importance for this event."
          />
          <EventsCard
            src="/img/convergence.jpg"
            title="Children's Day Celebration"
            description='Life is not about doing something great,but is about doing small things in great ways." The evening of 23rd Nov-Convergence 2k19 was yet another red letter day in glorious journey of परमार्थ.The alumni meet of IET-Convergence19 was scheduled for the 1994 pass out batch which was an eve filled with zeal and zest,with endless surprises, perfomances and events for our Alumnis. उमंग-The event of परमार्थ was like shining pearl in the ocean of enthusiasm.A sensational and spellbounding Dance performance on the theme "Save the Girl Child" was performed by tiny tots of परमार्थ which compelled every single person to give them a standing ovation. परमार्थ kids conveyed the message beautifully with an emotional connect.Not only this,To celebrate the jollity of childhood a Colourful dance was also performed by our little souls which forced everyone to dance on their beats.'
          />
        </Masonry>
      </div>
      <Footer />
    </>
  );
};

export default Events;
