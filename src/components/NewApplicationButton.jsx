"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "/utils/supabase/client";
import styles from "@/styles/newApplicationButton.module.css";
import dayjs from "dayjs";

function NewApplicationButton({ onApplicationSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [appliedDate, setAppliedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [status, setStatus] = useState("Applied");
  const [referralType, setReferralType] = useState("Cold Apply");
  const [applicationLink, setApplicationLink] = useState("");
  const [location, setLocation] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const supabase = createClient();

  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Technical", label: "Technical Interview" },
    { value: "Behavioural", label: "Behavioural Interview" },
    { value: "OA", label: "Online Assessment" },
    { value: "Offer", label: "Offer" },
    { value: "Rejected", label: "Rejected" },
    { value: "Accepted", label: "Accepted"},
    {value: "Declined", label: "Declined"}
  ];

  const referralOptions = [
    { value: "Referred", label: "Referred" },
    { value: "Cold Apply", label: "Cold Apply" },
    { value: "Employee Referral", label: "Employee Referral" },
  ];

  useEffect(() => {
    let timer;
    if (alertMessage) {
      timer = setTimeout(() => {
        setAlertMessage(null);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [alertMessage]);

  const shouldShowDueDate = ["Technical", "Behavioural", "OA", "Offer"].includes(status);

  const handleApplicationSubmit = async () => {
    if (!companyName || !role || !appliedDate || !status || !referralType) {
      setAlertMessage("Please fill all the required fields.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData?.user) {
      setAlertMessage("Could not retrieve authenticated user. Please log in.");
      return;
    }

    const applicationData = {
      user_id: userData.user.id,
      company_name: companyName,
      role,
      applied_date: appliedDate,
      status,
      referral_type: referralType,
      application_link: applicationLink || null,
      location: location || null, 
      update_by: shouldShowDueDate ? dueDate : null, 
    };

    const { error } = await supabase.from("applications").insert([applicationData]);

    if (error) {
      setAlertMessage("Error adding application. Please try again.");
    } else {
      setAlertMessage("Application added successfully!");
      setIsModalOpen(false);
      onApplicationSuccess();
    }
  };

  return (
    <>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        Add New
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
                <img src="/Images/cross.png" alt="" className={styles.crossimg} />
              </button>
              <h2>Add a New Application</h2>
            </div>

       

            <div className={styles.modalInfo}>

            <div className={styles.doubleRow}>  

                <div className={styles.rowInput}>
                <label>Company</label>
                    <input
                        type="text"
                        placeholder="Ex. Jobhill"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                <div className={styles.rowInput}>

                    <label>Role</label>
                    <input
                        type="text"
                        placeholder="Ex. Software Engineer 2025"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                </div>
 
  

             </div>

             <div className={styles.doubleRow}>
                <div className={styles.rowInput}>
                        <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        {statusOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                        ))}
                    </select>
                </div>

                <div className={styles.rowInput}>
                    <label>Referral</label>
                <select value={referralType} onChange={(e) => setReferralType(e.target.value)}>
                    {referralOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                    ))}
                </select>

                </div>


             </div>
             <label>Date Applied</label>
              <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
              />



              {shouldShowDueDate && (
                <>
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </>
              )}



              <div className={styles.doubleRow}>  

                    <div className={styles.rowInput}>
                        <label>Application Link (Optional)</label>
                        <input
                            type="text"
                            placeholder="Ex. https://example.com"
                            value={applicationLink}
                            onChange={(e) => setApplicationLink(e.target.value)}
                        />
                    </div>

                    <div className={styles.rowInput}>
                        <label>Location (Optional)</label>
                        <input 
                            type="text"
                            placeholder="Ex. New York, NY"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                </div>

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

export default NewApplicationButton;
