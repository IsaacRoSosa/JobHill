import { createClient } from '/utils/supabase/server';


export async function GET(request) {
  const supabase = createClient();

  // Intentamos obtener el usuario autenticado para asegurarnos de que la autenticación esté funcionando correctamente
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError) {
    return new Response(JSON.stringify({ error: 'User authentication failed' }), { status: 401 });
  }

  if (!user) {
    return new Response(JSON.stringify({ error: 'No authenticated user' }), { status: 401 });
  }

  // Si el usuario está autenticado, tratamos de obtener las aplicaciones
  let { data: applications, error } = await supabase
    .from('applications')
    .select(`
      id,
      role,
      applied_date,
      last_updated,
      status,
      referral_type,
      application_link,
      company_id,
      job_offer_id,
      location,
      update_by
    `);

  // Si hay un error al recuperar las aplicaciones, devolvemos una respuesta de error
  if (error) {
    console.log("Supabase error:", error);  // Imprimimos el error en la consola para más detalles
    return new Response(JSON.stringify({ error: 'Failed to fetch applications' }), { status: 500 });
  }

  // Si se obtienen correctamente las aplicaciones, las procesamos
  const apps = applications.map(app => {
    return {
      id: app.id,
      role: app.role,
      appliedDate: app.applied_date,
      lastUpdated: app.last_updated,
      status: app.status,
      referralType: app.referral_type,
      applicationLink: app.application_link,
      companyId: app.company_id,
      jobOfferId: app.job_offer_id,
      location: app.location,
      updatedBy: app.update_by
    };
  });

  // Retornamos las aplicaciones en formato JSON
  return new Response(JSON.stringify(apps), { status: 200 });
}
