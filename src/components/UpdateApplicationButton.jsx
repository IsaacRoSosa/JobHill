"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "/utils/supabase/client";
import dayjs from "dayjs";
import styles from "@/styles/updateApplicationButton.module.css";

function UpdateApplicationButton({ application, onUpdateSuccess }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState(application.status);
  const [location, setLocation] = useState(application.location);
  const [referralType, setReferralType] = useState(application.referralType);
  const [applicationLink, setApplicationLink] = useState(application.applicationLink || "");
  const [dueDate, setDueDate] = useState(application.dueDate || "");
  const [alertMessage, setAlertMessage] = useState(null);
  const supabase = createClient();
 
  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Technical", label: "Technical Interview" },
    { value: "Behavioural", label: "Behavioural Interview" },
    { value: "OA", label: "Online Assessment" },
    { value: "Offer", label: "Offer" },
    { value: "Rejected", label: "Rejected" },
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

  const handleUpdate = async () => {
    const lastUpdated = dayjs().format("YYYY-MM-DD");

    const { error } = await supabase
      .from("applications")
      .update({
        status,
        location,
        referral_type: referralType,
        application_link: applicationLink,
        last_updated: lastUpdated,
        update_by: shouldShowDueDate ? dueDate : null,
      })
      .eq("id", application.id);
 
    if (error) {
      setAlertMessage("Error updating application. Please try again.");
    } else {
      setAlertMessage("Application updated successfully!");
      setIsModalOpen(false);
      onUpdateSuccess();
    }
  };

  return (
    <>
      <button className={styles.updateButton} onClick={() => setIsModalOpen(true)}>
        Update
      </button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <button className={styles.cancelButton} onClick={() => setIsModalOpen(false)}>
                <img src="/Images/cross.png" alt="Close" className={styles.crossimg} />
              </button>
              <h2>Update Application</h2>
            </div>

            <div className={styles.modalInfo}>
              <div className={styles.doubleRow}>
                <div className={styles.rowInput}>
                  <label>Company</label>
                  <input className={styles.static} type="text" value={application.companyName} readOnly />
                </div>

                <div className={styles.rowInput}>
                  <label>Role</label>
                  <input type="text" value={application.role} readOnly />
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
                    value={applicationLink}
                    onChange={(e) => setApplicationLink(e.target.value)}
                  />
                </div>

                <div className={styles.rowInput}>

              <label>Location (Optional)</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
              </div>

              <div className={styles.actions}>
                <button className={styles.confirmButton} onClick={handleUpdate}>
                  Update Application
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

export default UpdateApplicationButton;
