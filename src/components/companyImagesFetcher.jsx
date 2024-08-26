import React from 'react'
import { createClient } from '/utils/supabase/server';

export default async function companyImagesFetcher() {
    const supabase = createClient();
  
    let { data: companies, error } = await supabase
      .from('companies')
      .select('name,logo_url')
      .order('name', { ascending: true })
      .limit(5);
  
     
  
    if (error) {
      console.error('Error fetching companies:', error);
      return <div>Error fetching companies</div>;
    }
  
    return (
      <div>
        <h1>My Applications</h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {companies.map((company) => (
            <div key={company.name} style={{ border: '1px solid #ccc', padding: '10px', width: '200px', textAlign: 'center' }}>
              <img src={`${company.logo_url}`} alt={company.name} style={{ width: '200px', height: '200px', objectFit: 'cover', backgroundColor: "white"}} />
              <h2>{company.name}</h2>
            </div>
          ))}
        </div>
      </div>
    );
  }