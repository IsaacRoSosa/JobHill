
import React from 'react';
import styles from '@/styles/CompanyCard.module.css';

const CompanyCard = ({ company, onSelect }) => {
  return (
    <div className={styles.companyCard} onClick={() => onSelect(company.companyId)}>
      <img src={company.companyLogo} alt={company.name} className={styles.companyLogo} />
      <div>
        <h3>{company.name}</h3>
        <p className={styles.openings}> {company.openings} Openings</p>
      </div>
    </div>
  );
};

export default CompanyCard;
