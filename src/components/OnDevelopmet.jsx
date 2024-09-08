"use client";
import React from "react";
import styles from "@/styles/OnDevelopment.module.css";

const OnDevelopment = () => {
  const titleText = "<h1> Coming Soon </h1>";
  const paragraphText = "<h2> Our dev team is working\n on this feature </h2>";

  return (
    <div className={styles.container}>
      <div className={styles.codeBox}>
        <br />
        <div className={styles.loaderTitle}>
          <span className={styles.loaderText}>{titleText}</span>
        </div>
        <br />
        <div className={`${styles.loaderParagraph}`}>
          <span className={styles.loaderText2}>{paragraphText}</span>
        </div>
        <img
          className={styles.devImage}
          src="/Images/jobmigaDeveloping2.png"
          alt="Under development"
        />
      </div>
    </div>
  );
};

export default OnDevelopment;
