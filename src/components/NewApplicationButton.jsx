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
  const [alertMessage, setAlertMessage] = useState(null);
  const supabase = createClient();

  const statusOptions = [
    { value: "Applied", label: "Applied" },
    { value: "Technical Interview", label: "Technical" },
    { value: "Behavioural Interview", label: "Behavioural" },
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
      }, 4000); // Limpiar la alerta después de 4 segundos
    }
    return () => clearTimeout(timer); // Limpieza del temporizador
  }, [alertMessage]);



  const handleApplicationSubmit = async () => {
    // Validar los campos obligatorios
    if (!companyName || !role || !appliedDate || !status || !referralType) {
      setAlertMessage("Please fill all the required fields.");
      return;
    }
  
    // Obtener el usuario autenticado
    const { data: userData, error: userError } = await supabase.auth.getUser();
  
    if (userError || !userData?.user) {
      setAlertMessage("Could not retrieve authenticated user. Please log in.");
      return;
    }
  
    const applicationData = {
      user_id: userData.user.id, // Agregar el user_id a los datos
      company_name: companyName,
      role,
      applied_date: appliedDate,
      status,
      referral_type: referralType,
      application_link: applicationLink || null, // Opcional
    };
  
    const { error } = await supabase.from("applications").insert([applicationData]);
  
    if (error) {
      setAlertMessage("Error adding application. Please try again.");
    } else {
      setAlertMessage("Application added successfully!");
      setIsModalOpen(false);
      onApplicationSuccess(); // Llamar a la función para actualizar la tabla en AppFetcher
    }
  };
  

  return (
    <>
      <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>
        Create New Application
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
              <label>Company</label>
              <input
                type="text"
                placeholder="Ex. Jobhill"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />

              <label>Role</label>
              <input
                type="text"
                placeholder="Ex. Software Engineer 2025"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />

              <label>Date Applied</label>
              <input
                type="date"
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
              />

              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label>Referral</label>
              <select value={referralType} onChange={(e) => setReferralType(e.target.value)}>
                {referralOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <label>Application Link (Optional)</label>
              <input
                type="text"
                placeholder="Ex. https://example.com"
                value={applicationLink}
                onChange={(e) => setApplicationLink(e.target.value)}
              />

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
