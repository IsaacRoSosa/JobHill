// /app/api/getJobs/route.js
import { createClient } from '/utils/supabase/server';
import dayjs from 'dayjs';

export async function GET(request) {
  const supabase = createClient();

  let { data: job_offers, error } = await supabase
    .from('job_offers')
    .select(`
      id,
      job_title,
      location,
      modality,
      period,
      categories,
      created_at,
      application_link,
      companies (id, name, logo_url),
      not_offer_sponsor,
      requires_usa_citizen
    `)
    .eq('status', 'Open')
    .order('created_at', { ascending: false })
    .limit(3000);

  if (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch jobs' }), { status: 500 });
  }

  // Calcular el tiempo transcurrido desde la fecha de creación y preparar los datos para el cliente
  const jobs = job_offers.map(job => {
    const createdAt = dayjs(job.created_at);
    const now = dayjs();
    const daysAgo = now.diff(createdAt, 'day');
    let postedDays;

    if (daysAgo < 7) {
      postedDays = `${daysAgo} days ago`;
    } else if (daysAgo < 30) {
      const weeksAgo = Math.floor(daysAgo / 7);
      postedDays = `${weeksAgo} week${weeksAgo > 1 ? 's' : ''} ago`;
    } else {
        const monthsAgo = Math.floor(daysAgo / 30);
        postedDays = `${monthsAgo} month${monthsAgo > 1 ? 's' : ''} ago`;
    }

    const displayLocation = job.location.length > 4 ? 'Multiple Locations' : job.location.filter(loc => loc.length > 2).join(', ');


    
 
    return {
      job_id: job.id,
      companyLogo: job.companies.logo_url,
      companyName: job.companies.name,
      companyId: job.companies.id,  
      title: job.job_title,
      postedDays,
      daysAgo,
      location: displayLocation,
      type: 'Full-Time',
      modality: job.modality,
      period: job.period,
      categories: job.categories.join(', '),
      application_link: job.application_link,
      not_offer_sponsor: job.not_offer_sponsor,
      requires_usa_citizen: job.requires_usa_citizen


    };
  });

  return new Response(JSON.stringify(jobs), { status: 200 });
}
