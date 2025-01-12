"use client";
import Image from 'next/image';
import { createClient } from "/utils/supabase/client";
import React, { useState, useEffect } from "react";
import styles from "@/styles/jobCard.module.css";

function HideApplication({ job, onConfirmHide }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [dontShowConfHide, setDontShowConfHide] = useState(false); 
  const supabase = createClient();
 
   
  useEffect(() => {
    const storedPreference = localStorage.getItem("dont_show_conf_hide");
    if (storedPreference) {
      setDontShowConfHide(JSON.parse(storedPreference));
    }
  }, []);

  useEffect(() => {
    let timer;
    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage(null);
      }, 2200); 
    }
    return () => clearTimeout(timer); 
  }, [alertMessage]);

  const handleHideJob = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (!data?.user) {
      setAlertMessage("No authenticated user. Please log in.");
      return;
    }

    try {
      const { data: preferences, error: fetchError } = await supabase
        .from("user_preferences")
        .select("hidden_jobs")
        .eq("user_id", data.user.id)
        .single();

      if (fetchError) {
        console.error("Error fetching preferences:", fetchError);
        setAlertMessage("Failed to fetch user preferences.");
        return;
      }

      const hiddenJobs = preferences?.hidden_jobs || [];
      if (hiddenJobs.includes(job.job_id)) {
        setAlertMessage("This job is already hidden.");
        return;
      }

      setAlertMessage(`Job "${job.title}" has been hidden.`);
      const updatedHiddenJobs = [...hiddenJobs, job.job_id];

      const { error: updateError } = await supabase
        .from("user_preferences")
        .update({ hidden_jobs: updatedHiddenJobs })
        .eq("user_id", data.user.id);

      if (updateError) {
        console.error("Error updating hidden jobs:", updateError);
        setAlertMessage("Failed to hide the job.");
        return;
      }

 
      
      if (typeof onApplicationHide === "function") {
        
        onApplicationHide(job.job_id);
        setAlertMessage(`Job "${job.title}" has been hidden.`);

      }
      onConfirmHide();  
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error hiding job:", err);
      setAlertMessage("An error occurred while hiding the job.");
    }
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.checked;
    setDontShowConfHide(value);
    localStorage.setItem("dont_show_conf_hide", JSON.stringify(value)); 
  };

  const handleHideButtonClick = () => {
    if (dontShowConfHide) {
      handleHideJob(); 
    } else {
      setIsModalOpen(true); 
    }
  };

  return (
    <>
      <button className={styles.hideButton} onClick={handleHideButtonClick}>
        <Image src="/Images/jobCard/hide.png" alt="Usa Citizenship Required" width={25} height={25} className={styles.status}/>
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay2}>
          <div className={styles.modal2}>
            <h3>
              Hide {job.title} - {job.role} Application?
            </h3>
            <div className={styles.actions}>
              <button className={styles.confirmButton2} onClick={handleHideJob}>
                Yes
              </button>
              <button
                className={styles.cancelButton2}
                onClick={() => setIsModalOpen(false)}
              >
                No
              </button>
            </div>
            <div className={styles.checkboxContainer}>
              <label>
                <input
                  type="checkbox"
                  checked={dontShowConfHide}
                  onChange={handleCheckboxChange}
                />
                Don't show this confirmation again
              </label>
            </div>
          </div>
        </div>
      )}

      {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
    </>
  );
}

export default HideApplication;