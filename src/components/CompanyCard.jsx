
import React, {memo} from 'react';
import styles from '@/styles/CompanyCard.module.css';

const CompanyCard = memo(({ company, onSelect }) => {
  return (
    <div className={styles.companyCard} onClick={() => onSelect(company.companyId)}>
      <img src={company.companyLogo ||'/Images/jobCard/office.png'} alt={company.name} className={styles.companyLogo} />
      <div>
        <h3>{company.name}</h3>
        <p className={styles.openings}> {company.openings} Openings</p>
      </div>
    </div>
  );
});
CompanyCard.displayName = 'CompanyCard';
export default CompanyCard;
