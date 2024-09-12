"use client";

import React, { useState } from "react";
import { createClient } from "/utils/supabase/client";
import styles from "@/styles/jobCard.module.css";
import dayjs from "dayjs";

function AddApplicationButton({ job }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referral_type, setReferral] = useState("Cold Apply");
  const [alertMessage, setAlertMessage] = useState(null);  // For handling alerts
  const supabase = createClient();

  const referralOptions = [
    { value: "Referred", label: "Referred" },
    { value: "Cold Apply", label: "Cold Apply" },
    { value: "Employee Referral", label: "Employee Referral" },
  ];

  const handleAddApplicationClick = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (!data?.user) {
      setAlertMessage("No authenticated user. Please log in.");
      return;
    }

     // Logging the job data to check if it's correct
     console.log("Job Data: ", job);

    setIsModalOpen(true);  // Open the modal
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
      job_offer_id: job.job_id,  // Ensure this key exists in the job data
      role: job.title,  // Ensure this key exists in the job data
      status: "Applied",
      applied_date: today,
      last_updated: today,
      application_link: job.application_link,  // Ensure this key exists in the job data
      company_name: job.companyName,  // Ensure this key exists in the job data
      company_id: job.companyId,  // Ensure this key exists in the job data
      location: job.location,  // Ensure this key exists in the job data
      referral_type,  // Referral selected by the user
    };

    // Insert the application into the 'applications' table
    const { error: insertError } = await supabase
      .from("applications")
      .insert([applicationData]);

    if (insertError) {
      setAlertMessage("Error adding application. Please try again.");
    } else {
      setAlertMessage(`Application added for job: ${job.title}`);
    }

    setIsModalOpen(false);  // Close the modal after submission
    setTimeout(() => setAlertMessage(null), 5000);  // Clear the alert after 5 seconds
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={styles.addButton} onClick={handleAddApplicationClick}>
        Add Application
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Confirm Application</h2>
         <p><strong>Job Title:</strong> {job.title || 'Unknown Title'}</p>
<p><strong>Company:</strong> {job.companyName || 'Unknown Company'}</p>
<p><strong>Location:</strong> {job.location || 'Location Not Specified'}</p>
            <p><strong>Applied Date:</strong> {dayjs().format("YYYY-MM-DD")}</p>
            <div>
              <label><strong>Referral:</strong></label>
              <select value={referral_type} onChange={(e) => setReferral(e.target.value)}>
                {referralOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.actions}>
              <button className={styles.cancelButton} onClick={handleModalClose}>
                Cancel
              </button>
              <button className={styles.confirmButton} onClick={handleApplicationSubmit}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alerts */}
      {alertMessage && (
        <div className={styles.alert}>
          {alertMessage}
        </div>
      )}
    </>
  );
}

export default AddApplicationButton;