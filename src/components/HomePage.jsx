"use client";
import React from "react";
import styles from "@/styles/HomePage.module.css";

const HomePage = () => {
  const handleSignIn = () => {
    window.location.href = "/login";  
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
    
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>A platform designed to assist you in your internship search process</h1>
        <p className={styles.description}>
          Discover opportunities and easily manage your applications. <br />Get started by creating or logging into your account.
        </p>
        <button className={styles.signInButton} onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default HomePage;
