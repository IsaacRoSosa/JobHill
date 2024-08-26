"use client";  // Para asegurarte de que se ejecute en el cliente

import React from 'react';

function ApplyButton({ applicationLink }) {
    const handleApplyClick = () => {
        window.open(applicationLink, '_blank');
    };

    return (
        <button onClick={handleApplyClick}>
            Apply
        </button>
    );
}

export default ApplyButton;
