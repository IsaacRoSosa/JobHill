"use client";

import React, { useState, useEffect} from "react";
import { createClient } from "/utils/supabase/client";
import styles from "@/styles/jobCard.module.css";
import dayjs from "dayjs";

function AddApplicationButton({ job, onApplicationSuccess }) {
  console.log('AddApplicationButton props:', { job, onApplicationSuccess }); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referral_type, setReferral] = useState("Cold Apply");
  const [alertMessage, setAlertMessage] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    let timer;
    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage(null);
      }, 2700); 
    }
    return () => clearTimeout(timer); 
  }, [alertMessage]);

  const handleAddApplicationClick = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (!data?.user) {
      setAlertMessage("No authenticated user. Please log in.");
      return;
    }

    setIsModalOpen(true);
  };

  const handleApplicationSubmit = async () => {
    const { data, error } = await supabase.auth.getUser();
    if (!data?.user) {
      setAlertMessage("No authenticated user. Please log in.");
      return;
    }

    const today = dayjs().format("YYYY-MM-DD");

    const applicationData = {
      user_id: data.user.id,
      job_offer_id: job.job_id,
      role: job.title,
      status: "Applied",
      applied_date: today,
      last_updated: today,
      application_link: job.application_link,
      company_name: job.companyName,
      company_id: job.companyId,
      location: job.location,
      referral_type,
    };

    const { error: insertError } = await supabase.from("applications").insert([applicationData]);


    
    if (insertError) {
      setAlertMessage("Error adding application. Please try again.");
    } else {
      setAlertMessage(`Application added for job: ${job.title}`);

      if (typeof onApplicationSuccess === 'function') {
        
        onApplicationSuccess();}

      setAlertMessage(`Application added for job: ${job.title}`);
    }

    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.addButton} onClick={handleAddApplicationClick}>
        Add Application
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <button className={styles.cancelButton} onClick={handleModalClose}>
                <img src="/Images/cross.png" alt="" className={styles.crossimg} />
              </button>
              <h2>Add a New Application</h2>
            </div>

            <div className={styles.modalInfo}>
              <label>Company</label>
              <input type="text" value={job.companyName || "Ex. Jobhill"} readOnly />

              <label>Date Applied</label>
              <input type="text" value={dayjs().format("YYYY-MM-DD")} readOnly />

              <label>Role</label>
              <input type="text" value={job.title || "Ex. Software Engineer 2025"} readOnly />

              <label>Status</label>
              <input type="text" value="Applied" readOnly />

              <label>Referral</label>
              <select value={referral_type} onChange={(e) => setReferral(e.target.value)}>
                <option value="Referred">Referred</option>
                <option value="Cold Apply">Cold Apply</option>
                <option value="Employee Referral">Employee Referral</option>
              </select>

              <div className={styles.actions}>
                <button className={styles.confirmButton} onClick={handleApplicationSubmit}>
                  Add Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
    </>
  );
}

export default AddApplicationButton;
