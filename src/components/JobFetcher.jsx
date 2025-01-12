"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { createClient } from "/utils/supabase/client";
import Select from 'react-select';
import styles from '@/styles/jobFetcher.module.css';
import JobCard from '@/components/JobCard';
import Loader from '@/components/Loader';
import CompanyCard from '@/components/CompanyCard';
 
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    borderRadius: '8px',
    borderColor: state.isFocused ? '#2684FF' : '#ccc',
    boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
    '&:hover': {
      borderColor: '#2684FF',
    },
    minHeight: '40px', 

  }),
  singleValue: (provided) => ({
    ...provided,
    color: '#333',
    width: '100%',
  }),   
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#e0e0e0',
    borderRadius: '12px', 
    color: '#333',
    maxWidth: '100%',
    padding: '2px 5px', 
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#333',
    width: '100%',
    maxWidth: '100px', 
    fontSize: '0.9rem', 
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#333',
    backgroundColor: state.isSelected ? '#2684FF' : '#fff',
    '&:hover': {
      backgroundColor: state.isSelected ? '#2684FF' : '#f0f0f0',
    },
    width: '100%',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#999', 
    width: '100%',
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
    width: '130%',
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
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [hiddenJobs, setHiddenJobs] = useState([]); 


  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showCompanies, setShowCompanies] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [loading, setLoading] = useState(true);
  const supabase = createClient()
  const [filters, setFilters] = useState({
    company: '',
    role: '',
    modality: { value: 'All', label: 'All' },
    categories: [],
    period: [],
    orderBy: { value: 'Ascending', label: 'Newest First' },
    notOfferSponsor: false,
    requiresUsaCitizen: false,
  });
  const [companyFilters, setCompanyFilters] = useState({
    search: '',
    sortBy: {value: 'A-Z', label: 'A-Z'},
    sortByOpenings: {value: 'openingsDesc', label: 'More Openings'}
  });
  const toggleFilters = () => setShowFilters(!showFilters);
  const toggleCompanies = () => {
    setShowCompanies(!showCompanies);
    setSelectedCompany(null); 
  }
  const selectCompany = (companyId) => {
    setSelectedCompany(companyId); 
    setShowCompanies(false);
  };
  const sortOptions = [
    { value: 'A-Z', label: 'A-Z' },
    { value: 'Z-A', label: 'Z-A' },
    { value: 'openingsAsc', label: 'Fewer Openings' },
    { value: 'openingsDesc', label: 'More Openings' },

  ];
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
 
  const fetchJobs = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/getJobs');
      const jobsData = await response.json();

      // Fetch user preferences (if authenticated)
      const user = await supabase.auth.getUser();
      let hiddenJobsFromPreferences = [];
      if (user?.data?.user) {
        const { data: preferences, error } = await supabase
          .from("user_preferences")
          .select("hidden_jobs")
          .eq("user_id", user.data.user.id)
          .single();

        if (error) {
          console.error("Error fetching user preferences:", error);
        } else {
          hiddenJobsFromPreferences = preferences?.hidden_jobs || [];
        }
      }
      //Filter hidden Jobs
      const visibleJobs = jobsData.filter(
        (job) => !hiddenJobsFromPreferences.includes(job.job_id)
      );
  



      const groupedCompanies = visibleJobs.reduce((acc, job) => {
        if (!acc[job.companyName]) {
          acc[job.companyName] = { 
            companyId: job.companyId, 
            name: job.companyName, 
            openings: 0, 
            companyLogo: job.companyLogo
          };
        }
        acc[job.companyName].openings += 1;
        return acc;
      }, {});
      const companiesArray = Object.values(groupedCompanies);

      setAllJobs(visibleJobs);
      setJobs(visibleJobs);
      setCompanies(companiesArray);
      setFilteredCompanies(companiesArray);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching job offers:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onApplicationHide = async (jobId) => {

     // Remove hidden job from the visible list
     setTimeout(() => {
      setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
      setAllJobs((prevAllJobs) => prevAllJobs.filter((job) => job.job_id !== jobId));

     }, 3000)
   

     setHiddenJobs((prevHiddenJobs) => [...prevHiddenJobs, jobId]);

 


    try {
      const user = await supabase.auth.getUser();
      if (!user?.data?.user){
        console.error("No authenticated user.");
      return;
      }
  
    // 1) Update user_preferences in Supabase 
    const { data: preferences, error: fetchError } = await supabase
        .from("user_preferences")
        .select("hidden_jobs")
        .eq("user_id", user.data.user.id)
        .single();
  
      if (fetchError) {
        console.error("Error fetching hidden jobs:", fetchError);
        return;
      }
  
      // Merge the new hidden job with the current hidden jobs
      const hiddenJobsFromDB = preferences?.hidden_jobs || [];
      if (hiddenJobsFromDB.includes(jobId)) {
        return;
      }
  
      const updatedHiddenJobs = [...hiddenJobsFromDB, jobId];
      const { error: updateError } = await supabase
        .from("user_preferences")
        .update({ hidden_jobs: updatedHiddenJobs })
        .eq("user_id", user.data.user.id);
  
      if (updateError) {
        console.error("Error updating hidden jobs:", updateError);
        return;
      } 
  
    } catch (error) {
      console.error("Error hiding job:", error);
    }
    updateHiddenJobs();

  };
  


  const applyFilters = () => {
    let visibleJobs = [...allJobs];

    if (selectedCompany) {
      visibleJobs = visibleJobs.filter(job => job.companyId === selectedCompany);
    }

    // Filter by company
    if (filters.company) {
      visibleJobs = visibleJobs.filter(job =>
        job.companyName.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Filter by role
    if (filters.role) {
      visibleJobs = visibleJobs.filter(job =>
        job.title.toLowerCase().includes(filters.role.toLowerCase())
      );
    }

    // Filter by modality
    if (filters.modality.value !== 'All') {
      visibleJobs = visibleJobs.filter(job =>
        job.modality === filters.modality.value
      );
    }
    //Filter by Sponsorshio
    if (filters.notOfferSponsor) {
      visibleJobs = visibleJobs.filter(job => job.notOfferSponsor === 1);
    }  
    
    if (filters.requiresUsaCitizen) {
      visibleJobs = visibleJobs.filter(job => job.requiresUsaCitizen === 1);
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      const selectedCategories = filters.categories.map(cat => cat.value);
      visibleJobs = visibleJobs.filter(job =>
        selectedCategories.some(cat => job.categories.includes(cat))
      );
    }

    // Filter by period
    if (filters.period.length > 0) {
      const selectedPeriods = filters.period.map(period => period.value);
      visibleJobs = visibleJobs.filter(job =>
        selectedPeriods.includes(job.period)
      );
    }

    // Sort by date
    visibleJobs = visibleJobs.sort((a, b) => {
      if (filters.orderBy.value === 'Ascending') {
        return a.daysAgo - b.daysAgo;
      } else {
        return b.daysAgo - a.daysAgo;
      }
    });

    setJobs(visibleJobs);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, selectedCompany]);




  const handleFilterChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: selectedOption,
    }));
  };

  const applyCompanyFilters = useMemo(() => {
    let filtered = [...companies];

    // Filtrar por nombre de compañía
    if (companyFilters.search) {
      filtered = filtered.filter(company => 
        company.name.toLowerCase().includes(companyFilters.search.toLowerCase())
      );
    }

    // Ordenar según la selección
    switch (companyFilters.sortBy.value) {
      case 'A-Z':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Z-A':
        filtered = filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'openingsAsc':
        filtered = filtered.sort((a, b) => a.openings - b.openings);
        break;
      case 'openingsDesc':
        filtered = filtered.sort((a, b) => b.openings - a.openings);
        break;
      default:
        break;
    }

    setFilteredCompanies(filtered);
  }, [companyFilters, companies]);


  const handleCompanyFilterChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setCompanyFilters(prevFilters => ({
      ...prevFilters,
      [name]: selectedOption,
    }));
  };

  const handleSearchChange = (e) => {
    setCompanyFilters(prevFilters => ({
      ...prevFilters,
      search: e.target.value,
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
    }, 2200); 
  };

  const hideJobFromList = (jobId) => {

    setHiddenJobs((prevHiddenJobs) => [...prevHiddenJobs, jobId]);
    setJobs((prevJobs) => prevJobs.filter((job) => job.job_id !== jobId));
    setAllJobs((prevAllJobs) => prevAllJobs.filter((job) => job.job_id !== jobId));

  };
  

  return (
    <div>



      {showCompanies ? (
        <>
        <div className={styles.TheHeader}>



          <div className={styles.filterHeader}>
              <div className={styles.filterGroup2}>
                <label htmlFor="companySearch">Company Name</label>
                <input
                  type="text"
                  id="companySearch"
                  placeholder="Search Company"
                  value={companyFilters.search}
                  onChange={handleSearchChange}
                />
              </div>
              <div className={styles.filterGroup}>
                <label htmlFor="sortBy">Sort by</label>
                <Select
                  name="sortBy"
                  value={companyFilters.sortBy}
                  onChange={handleCompanyFilterChange}
                  options={sortOptions}
                  styles={customStyles}
                  isSearchable={false}
                />
              </div>
            </div>

            <div className={styles.header2}> 
              <button className={styles.toggleButton} onClick={toggleCompanies}>
                {showCompanies ? 'Show Job Listings' : 'Show Companies'}
              </button>
            </div>
        </div>


        
            <div className={styles.companyGrid}>
            {filteredCompanies.map(company => (
              <CompanyCard 
                key={company.companyId} 
                company={company} 
                onSelect={selectCompany} 
              />
            ))}
          </div>
      </>
      ) : (
        <>
        <div className={styles.TheHeader}>

          {showFilters && (
            <div className={styles.filterHeader}>
                            {selectedCompany && (
                  <button onClick={toggleCompanies} className={styles.backButton}>
                    <img src="/Images/sidebar/back.png" alt="Go Back" className={styles.arrow} />
                  </button>
              )}

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
          )}

            <div className={styles.header2}> 
                <button className={styles.toggleButton} onClick={toggleFilters}>
                {showFilters ? 'Hide filters' : 'Show filters'}
              </button>

              <button className={styles.toggleButton} onClick={toggleCompanies}>
                {showCompanies ? 'Show Job Listings' : 'Show Companies'}
              </button>
            </div>
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
                <JobCard
                 key={job.job_id} 
                 job={job}
                 onApplicationSuccess={() => removeJobFromList(job.job_id)} 
                 onApplicationHide={() => onApplicationHide(job.job_id)}
                 />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}