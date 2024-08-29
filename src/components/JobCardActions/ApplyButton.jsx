"use client";  // Para asegurarte de que se ejecute en el cliente

import React from 'react';
import styles from '@/styles/jobCard.module.css';


function ApplyButton({ applicationLink }) {
    const handleApplyClick = () => {
        window.open(applicationLink, '_blank');
    };

    return (
        <button className={styles.applyButton} onClick={handleApplyClick}>
            Apply
        </button>
    );
}

export default ApplyButton;
