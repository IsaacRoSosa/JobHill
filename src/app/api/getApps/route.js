import { createClient } from '/utils/supabase/server';
import dayjs from 'dayjs';

export async function GET(request) {
  const supabase = createClient();

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
      company_name,
      job_offer_id,
      location,
      update_by,

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
      lastUpdated: app.last_updated,  // Formatear la última fecha de actualización
      status: app.status,
      companyName: app.company_name,
      referralType: app.referral_type,
      applicationLink: app.application_link,
      companyId: app.company_id,
      jobOfferId: app.job_offer_id,
      location: app.location,
      updatedBy: app.update_by ? app.update_by : null,  // Formatear el campo `update_by`

    };
  });

  // Retornamos las aplicaciones en formato JSON
  return new Response(JSON.stringify(apps), { status: 200 });
}
