"use client";  // Para asegurarte de que se ejecute en el cliente

import React from 'react';

function AddApplicationButton({ job }) {
    const handleAddApplicationClick = () => {
        console.log(`Application added for job: ${job.title}`);
        // Aquí puedes agregar la lógica para enviar la aplicación a tu base de datos, etc.
    };

    return (
        <button onClick={handleAddApplicationClick}>
            Add Application
        </button>
    );
}

export default AddApplicationButton;
