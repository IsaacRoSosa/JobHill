"use client"
import React, { useState } from 'react';
import Select from 'react-select';
import styles from '@/styles/appFetcher.module.css';
import AppTable from '@/components/AppTable';

const AppFetcher = () => {
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    status: { value: 'All', label: 'All' },
    referral: { value: 'All', label: 'All' },
    orderBy: { value: 'Closest Action', label: 'Closest Action' },
  });

// Mock data for the table
const applications = [
  {
    company: 'Microsoft',
    role: 'FullStack Developer',
    applied: '15/08/24',
    lastUpdated: '23/08/24',
    dueDate: '25/08/24',
    status: 'Rejected',
    referral: 'Cold Apply'
  },
  {
    company: 'Google',
    role: 'FrontEnd Developer',
    applied: '10/08/24',
    lastUpdated: '22/08/24',
    dueDate: '26/08/24',
    status: 'Offer',
    referral: 'Referred'
  },
  {
    company: 'Amazon',
    role: 'Backend Developer',
    applied: '12/08/24',
    lastUpdated: '20/08/24',
    dueDate: '28/08/24',
    status: 'Technical Interview',
    referral: 'Employee Referral'
  },
  {
    company: 'Facebook',
    role: 'Data Scientist',
    applied: '18/08/24',
    lastUpdated: '21/08/24',
    dueDate: '29/08/24',
    status: 'Behavioural Interview',
    referral: 'Cold Apply'
  },
  {
    company: 'Apple',
    role: 'iOS Developer',
    applied: '14/08/24',
    lastUpdated: '19/08/24',
    dueDate: '27/08/24',
    status: 'Onboarding Assesment',
    referral: 'Referred'
  },
  {
    company: 'Netflix',
    role: 'UI/UX Designer',
    applied: '11/08/24',
    lastUpdated: '18/08/24',
    dueDate: '30/08/24',
    status: 'Applied',
    referral: 'Employee Referral'
  },
  {
    company: 'Spotify',
    role: 'DevOps Engineer',
    applied: '13/08/24',
    lastUpdated: '17/08/24',
    dueDate: '31/08/24',
    status: 'Rejected',
    referral: 'Cold Apply'
  },
  {
    company: 'Tesla',
    role: 'Machine Learning Engineer',
    applied: '16/08/24',
    lastUpdated: '24/08/24',
    dueDate: '01/09/24',
    status: 'Offer',
    referral: 'Referred'
  },
  {
    company: 'Adobe',
    role: 'Product Manager',
    applied: '17/08/24',
    lastUpdated: '25/08/24',
    dueDate: '02/09/24',
    status: 'Technical Interview',
    referral: 'Employee Referral'
  },
  {
    company: 'Intel',
    role: 'Hardware Engineer',
    applied: '19/08/24',
    lastUpdated: '26/08/24',
    dueDate: '03/09/24',
    status: 'Behavioural Interview',
    referral: 'Cold Apply'
  },
  {
    company: 'IBM',
    role: 'Cloud Architect',
    applied: '20/08/24',
    lastUpdated: '27/08/24',
    dueDate: '04/09/24',
    status: 'Onboarding Assesment',
    referral: 'Referred'
  },
  {
    company: 'Oracle',
    role: 'Database Administrator',
    applied: '21/08/24',
    lastUpdated: '28/08/24',
    dueDate: '05/09/24',
    status: 'Applied',
    referral: 'Employee Referral'
  },
  {
    company: 'Salesforce',
    role: 'Intern – Product Engineer - Summer 2025',
    applied: '22/08/24',
    lastUpdated: '29/08/24',
    dueDate: '06/09/24',
    status: 'Rejected',
    referral: 'Cold Apply'
  },
  {
    company: 'Twitter',
    role: 'Content Strategist',
    applied: '23/08/24',
    lastUpdated: '30/08/24',
    dueDate: '07/09/24',
    status: 'Offer',
    referral: 'Referred'
  },
];

  

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

      <div className={styles.compCont}>
            <div className={styles.tableContainer}>

              <AppTable applications={applications}/>


            </div>


      </div>

    </div>
  );
};

export default AppFetcher;