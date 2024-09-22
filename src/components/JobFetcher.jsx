"use client";
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import styles from '@/styles/jobFetcher.module.css';
import JobCard from '@/components/JobCard';
import Loader from '@/components/Loader';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: 200,
    borderRadius: '8px',
    borderColor: state.isFocused ? '#2684FF' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
    '&:hover': {
      borderColor: '#2684FF',
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
    width: 150,
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    color: '#333',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
    
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#333',
    backgroundColor: state.isSelected ? '#2684FF' : '#fff',
    '&:hover': {
      backgroundColor: state.isSelected ? '#2684FF' : '#f0f0f0',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999', 
  }),
};

const periodStyles = {
  option: (provided, state) => {
    let backgroundColor;
    switch (state.data.value) {
      case 'Summer':
        backgroundColor = '#FFEFD5'; 
        break;
      case 'Spring':
        backgroundColor = '#E0FFE0'; 
        break;
      case 'Fall':
        backgroundColor = '#FFE4B5'; 
        break;
      case 'Winter':
        backgroundColor = '#ADD8E6'; 
        break;
      default:
        backgroundColor = '#fff';
    }
    return {
      ...provided,
      backgroundColor: state.isFocused ? '#2684FF' : backgroundColor,
      color: state.isSelected ? '#fff' : '#333',
      '&:hover': {
        backgroundColor: state.isFocused ? '#2684FF' : '#f0f0f0',
      },
    };
  },
  control: (provided, state) => ({
    ...provided,
    width: 200,
    borderRadius: '8px',
    borderColor: state.isFocused ? '#2684FF' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
    '&:hover': {
      borderColor: '#2684FF',
    },
  }),
  multiValue: (provided, state) => {
    let backgroundColor;
    switch (state.data.value) {
      case 'Summer':
        backgroundColor = '#FFEFD5'; // PeachPuff
        break;
      case 'Spring':
        backgroundColor = '#E0FFE0'; // Light Green
        break;
      case 'Fall':
        backgroundColor = '#FFE4B5'; // Moccasin
        break;
      case 'Winter':
        backgroundColor = '#ADD8E6'; // Light Blue
        break;
      default:
        backgroundColor = '#fff';
    }
    return {
      ...provided,
      backgroundColor,
      borderRadius: '4px',
    };
  },
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
  }),
};

export default function JobFetcher() {
  const [allJobs, setAllJobs] = useState([]); 
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    modality: { value: 'All', label: 'All' },
    categories: [],
    period: [],
    orderBy: { value: 'Ascending', label: 'Newest First' },
  });

  const [loading, setLoading] = useState(true);

  const modalityOptions = [
    { value: 'All', label: 'All' },
    { value: 'On Site', label: 'On Site' },
    { value: 'Remote', label: 'Remote' }
  ];

  const periodOptions = [
    { value: 'Summer', label: 'Summer' },
    { value: 'Spring', label: 'Spring' },
    { value: 'Fall', label: 'Fall' },
    { value: 'Winter', label: 'Winter' }
  ];

  const orderByOptions = [
    { value: 'Descending', label: 'Oldest First' },
    { value: 'Ascending', label: 'Newest First' }
  ];

  const categoryOptions = [
    { value: 'Android Dev', label: 'Android Development' },
    { value: 'FullStack Eng', label: 'FullStack Engineering' },
    { value: 'FrontEnd Eng', label: 'FrontEnd Engineering' },
    { value: 'BackEnd Eng', label: 'BackEnd Engineering' },
    { value: 'Data & Analytics', label: 'Data & Analytics' },
    { value: 'AI & ML', label: 'AI & ML' },
    { value: 'Cybersecurity', label: 'Cybersecurity' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Cloud Computing', label: 'Cloud Computing' },
    { value: 'Game Dev', label: 'Game Development' },
    { value: 'Mobile Dev', label: 'Mobile Development' },
    { value: 'Software Eng', label: 'Software Engineering' },
    { value: 'Quant', label: 'Quant' },
    { value: 'AR/VR', label: 'AR/VR' },
    { value: 'Research', label: 'Research' },
    { value: 'IOs Dev', label: 'IOs Development' },
    { value: 'IT', label: 'IT' },
    { value: 'QA & Testing', label: 'QA & Testing' },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/getJobs');
        const data = await response.json();
        setAllJobs(data); 
        setJobs(data); 
        setLoading(false);
      } catch (err) {
        console.error('Error fetching job offers:', err);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filteredJobs = [...allJobs];

    // Filter by company
    if (filters.company) {
      filteredJobs = filteredJobs.filter(job =>
        job.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Filter by role
    if (filters.role) {
      filteredJobs = filteredJobs.filter(job =>
        job.title.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    // Filter by modality
    if (filters.modality.value !== 'All') {
      filteredJobs = filteredJobs.filter(job =>
        job.modality === filters.modality.value
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      const selectedCategories = filters.categories.map(cat => cat.value);
      filteredJobs = filteredJobs.filter(job =>
        selectedCategories.some(cat => job.categories.includes(cat))
      );
    }

    // Filter by period
    if (filters.period.length > 0) {
      const selectedPeriods = filters.period.map(period => period.value);
      filteredJobs = filteredJobs.filter(job =>
        selectedPeriods.includes(job.period)
      );
    }

    // Sort by date
    filteredJobs = filteredJobs.sort((a, b) => {
      if (filters.orderBy.value === 'Ascending') {
        return a.daysAgo - b.daysAgo;
      } else {
        return b.daysAgo - a.daysAgo;
      }
    });

    setJobs(filteredJobs);
  };

  const handleFilterChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: selectedOption,
    }));
  };

  const resetFilters = () => {
    setFilters({
      company: '',
      role: '',
      modality: { value: 'All', label: 'All' },
      categories: [],
      period: [],
      orderBy: { value: 'Ascending', label: 'Newest First' },
    });
  };

  const removeJobFromList = (jobId) => {

    setTimeout(() => {
      setJobs((prevJobs) => prevJobs.filter(job => job.job_id !== jobId));
      setAllJobs((prevAllJobs) => prevAllJobs.filter(job => job.job_id !== jobId));
    }, 3000); 
  };
  

  return (
    <div>
      <div className={styles.filterHeader}>
        <div className={styles.filterGroup2}>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            placeholder="Ex. Jobhill"
            value={filters.company}
            onChange={(e) => setFilters({ ...filters, company: e.target.value })}
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
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="modality">Modality</label>
          <Select
            name="modality"
            value={filters.modality}
            onChange={handleFilterChange}
            options={modalityOptions}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="categories">Categories</label>
          <Select
            name="categories"
            value={filters.categories}
            onChange={handleFilterChange}
            options={categoryOptions}
            styles={customStyles}
            isMulti
            isSearchable
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="period">Period</label>
          <Select
            name="period"
            value={filters.period}
            onChange={handleFilterChange}
            options={periodOptions}
            styles={periodStyles}
            isMulti
            isSearchable
          />
        </div>
        <div className={styles.filterGroup}>
          <label htmlFor="orderBy">Order by</label>
          <Select
            name="orderBy"
            value={filters.orderBy}
            onChange={handleFilterChange}
            options={orderByOptions}
            styles={customStyles}
            isSearchable={false}
          />
        </div>
        <button className={styles.resetButton} onClick={resetFilters}>Reset</button>
      </div>

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
      ) : (
        <div className={styles.jobGrid}>
          {jobs.map((job) => (
            <JobCard key={job.job_id} job={job} onApplicationSuccess={() => removeJobFromList(job.job_id)} />
          ))}
        </div>
      )}
    </div>
  );
}
