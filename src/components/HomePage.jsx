"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/HomePage.module.css";
import { createClient } from "/utils/supabase/client";

const HomePage = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const supabase = createClient();
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    checkSession();
  }, []);

  const handleSignIn = () => {
    window.location.href = "/login";  
  };

  const handleGoToJobs = () => {
    window.location.href = "/jobs";  
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>A platform designed to assist you in your internship search process</h1>
        <p className={styles.description}>
          Discover opportunities and easily manage your applications. <br />Get started by creating or logging into your account.
        </p>
        {session ? (
          <button className={styles.signInButton} onClick={handleGoToJobs}>
            Go to Jobs
          </button>
        ) : (
          <button className={styles.signInButton} onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
