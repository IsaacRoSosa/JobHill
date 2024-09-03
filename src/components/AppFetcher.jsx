"use client"
import React, { useState } from 'react';
import Select from 'react-select';
import styles from '@/styles/appFetcher.module.css';

const AppFetcher = () => {
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    status: { value: 'All', label: 'All' },
    referral: { value: 'All', label: 'All' },
    orderBy: { value: 'Closest Action', label: 'Closest Action' },
  });

  // Options for the selects
  const statusOptions = [
    { value: 'All', label: 'All' },
    { value: 'Applied', label: 'Applied' },
    { value: 'Technical Interview', label: 'Technical' },
    { value: 'Behavioural Interview', label: 'Behavioural' },
    { value: 'Onboarding Assesment', label: 'OA' },
    { value: 'Offer', label: 'Offer' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  const referralOptions = [
    { value: 'All', label: 'All' },
    { value: 'Referred', label: 'Referred' },
    { value: 'Cold Apply', label: 'Cold Apply' },
    { value: 'Employee Referral', label: 'Employee Referral' },
  ];

  const orderByOptions = [
    { value: 'Closest Action', label: 'Closest Action' },
    { value: 'Latest Applied', label: 'Latest Applied' },
    { value: 'Just Applied', label: 'Just Applied' },
  ];

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      width: 150,
      padding: '1px',
      borderRadius: '5px',
      borderColor: '#ccc',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#2684FF',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#999',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? '#fff' : '#666', // Cambiar el color predeterminado a gris
      backgroundColor: state.isSelected ? '#2684FF' : '#fff',
      '&:hover': {
        backgroundColor: state.isSelected ? '#2684FF' : '#BFEBFF',
      },
    }),
  };

  const handleFilterChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: selectedOption,
    }));
  };

  return (
    <div className={styles.page}>
      <div className={styles.filterHeader}>
        <div className={styles.filterGroup2}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="Ex. Jobhill"
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterGroup2}>
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            placeholder="Ex. Software Engineer"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            className={styles.filterInput}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="status">Status</label>
          <Select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            options={statusOptions}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="referral">Referral</label>
          <Select
            name="referral"
            value={filters.referral}
            onChange={handleFilterChange}
            options={referralOptions}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="orderBy">Order By</label>
          <Select
            name="orderBy"
            value={filters.orderBy}
            onChange={handleFilterChange}
            options={orderByOptions}
            styles={customSelectStyles}
            isSearchable={false}
          />
        </div>
        <div className={styles.filterButtons}>
          <button className={styles.resetButton} onClick={() => setFilters({
            company: '',
            role: '',
            status: { value: 'All', label: 'All' },
            referral: { value: 'All', label: 'All' },
            orderBy: { value: 'Closest Action', label: 'Closest Action' },
          })}>
            Reset
          </button>
          <button className={styles.searchButton}>Create New</button>
        </div>
      </div>

      <div className={styles.tableContainer}>


      </div>
    </div>
  );
};

export default AppFetcher;