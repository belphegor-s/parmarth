import React, { useState, useEffect } from "react";
import styles from "./Schooling.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import toast from "react-hot-toast";
import RteCard from "../../components/RteCard/RteCard";
import { Link } from "react-router-dom";
import backendUrl from "../../backendUrl";

const Schooling = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getRteData = async () => {
      setIsLoading(true);
      await fetch(`${backendUrl}/getRteData`)
        .then((res) => {
          if (res.status !== 200) {
            return [];
          }
          return res.json();
        })
        .then((res) => {
          if (res === []) {
            toast.error("Failed to load RTE Data");
            return;
          }

          // Getting all academic years
          setAcademicYears([...new Set(res.map((data) => data.academicYear))]);
        })
        .catch((err) => toast.error(err.message));

      setIsLoading(false);
    };
    getRteData();
  }, []);

  return (
    <>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.content}>
          <h1>Consummating the Inconceivable</h1>
          <hr className={styles.hr} />
          <img src="/img/schooling-rte.jpeg" alt="" />
          <p>
            " Education is the most powerful weapon that can be used to change
            the world ". In the world full of gratuitous loathing , detestation
            and unwarranted abhorrence, education, not only can lead to greater
            sense of cosmic unity . Education is the only expedient for ensuring
            a better future , a future where folks rise above their narrow
            compartmentilisation and archaic mentality , a future where no child
            has commerce his childhood by begging , a future where every child
            is fed and a future where there's no one is is victimised .
            Education is not limited to any particular section of society. It is
            as fundamental as life. Everyone should be provided with a chance to
            get it, to get a basic tool by which they can shape themselves and
            the society. To deepen roots of education in every section of
            society, our constitution provides right of free and compulsory
            education to every kid, where no one can snap their right of getting
            it. Right To Education (RTE) act empowers the poor section and
            ensure that their kids can also get quality education and can push
            their limits. Unfortunately, most of government schemes doesn't
            reach true beneficiaries, including RTE. परमार्थ served as a link
            between government and deserving from past 4 years. It works on all
            fronts i.e pre admission, admission and post admission. Pre
            admission include survey of kids in slum who can be admitted in
            primary and class 1 and filling their admission forms with all the
            required documents. Once results of admissions are announced by
            lottery system, volunteers visit schools and do all admission
            formalities. We also fulfill other needs at time of admissions such
            as stationary, books, dress depending upon financial situation of
            parents. But, we are not finished with it yet, post admission
            include monitoring of kids so that no problem arises from any of
            sides, for this volunteers attend Parent Teachers meeting of every
            school. Till date परमार्थ has admitted more than 142 students in
            private schools through RTE. Dream of 142 eyes have been fulfilled
            which they might have seen while seeing school going kids. May
            someday getting education be no more a dream and every eye gets
            sparkle of education in it.
          </p>
        </div>
        <h1 id="rte-data">RTE Admission Data</h1>
        <div className={styles["rte-data"]}>
          {academicYears.length !== 0 ? (
            academicYears.map((academicYear, index) => (
              <Link
                key={index}
                to={`/rte-data/${academicYear}`}
                className={styles["rte-card"]}
                onClick={() =>
                  localStorage.setItem("academicYear", academicYear)
                }
              >
                <RteCard academicYear={academicYear} />
              </Link>
            ))
          ) : isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            <h2>No Data to show</h2>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Schooling;
