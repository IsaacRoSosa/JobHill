"use client";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from '@/styles/appFetcher.module.css';
import AppTable from '@/components/AppTable';
import NewApplicationButton from '@/components/NewApplicationButton';
import Loader from '@/components/Loader';
 
const AppFetcher = () => {
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    status: { value: 'All', label: 'All' },
    referral: { value: 'All', label: 'All' },
    orderBy: { value: 'Just Applied', label: 'Just Applied' },
  });
 
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchApplications = async () => {
    try { 
      const response = await fetch('/api/getApps'); 
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error fetching applications');
      setApplications(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }; 

  useEffect(() => {
    
    fetchApplications();
  }, []); 

  // Function to apply the filters to the applications list
  const applyFilters = () => {
    let filteredApps = [...applications];

    // Filter by company
    if (filters.company) {
      filteredApps = filteredApps.filter(app =>
        app.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Filter by role
    if (filters.role) {
      filteredApps = filteredApps.filter(app =>
        app.role.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    // Filter by status
    if (filters.status.value !== 'All') {
      filteredApps = filteredApps.filter(app => app.status === filters.status.value);
    }

    // Filter by referral
    if (filters.referral.value !== 'All') {
      filteredApps = filteredApps.filter(app => app.referralType === filters.referral.value);
    }

// Sort applications based on orderBy filter
switch (filters.orderBy.value) {
  case 'Closest Action':
    filteredApps = filteredApps.sort((a, b) => new Date(a.updatedBy) - new Date(b.updatedBy));
    break;
  case 'Just Applied':
    filteredApps = filteredApps.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
    break;
  case 'Latest Applied':
    filteredApps = filteredApps.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
    break;
  default:
    break;
}
    return filteredApps;
  };

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
      width: 160,
      height: 2,
      padding: '0px',
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
      color: state.isSelected ? '#fff' : '#666',
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

  const filteredApplications = applyFilters();

  const handleApplicationSuccess = () => {
    fetchApplications();
  }

  const handleApplicationDelete = () => {
    fetchApplications();
  };

  const handleApplicationUpdate = () => {
    fetchApplications();
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
            orderBy: { value: 'Just Applied', label: 'Just Applied' },
          })}>
            Reset
          </button>
          <NewApplicationButton onApplicationSuccess={handleApplicationSuccess} />
        </div>
      </div>

      <div className={styles.compCont}>
        <div className={styles.tableContainer}>
          {loading ? (
              <div className={styles.loaderCont}>
              <Loader className={styles.loader} /> 
              <div className={styles.loading}>
              <span>L</span>
              <span>o</span>
              <span>a</span>
              <span>d</span>
              <span>i</span>
              <span>n</span>
              <span>g</span>
            </div>

      </div>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <AppTable 
              applications={filteredApplications} 
              onApplicationDelete={handleApplicationDelete}
              onApplicationUpdate={handleApplicationUpdate}
            />
          )}
        </div>
      </div>
    </div>
  ); 
};

export default AppFetcher;
