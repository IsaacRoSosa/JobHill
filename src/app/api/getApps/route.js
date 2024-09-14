import { createClient } from '/utils/supabase/server';
import dayjs from 'dayjs';

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
      company_name,
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
      appliedDate: dayjs(app.applied_date).format('YY-MM-DD'),  // Formatear la fecha de aplicación
      lastUpdated: dayjs(app.last_updated).format('YY-MM-DD'),  // Formatear la última fecha de actualización
      status: app.status,
      companyName: app.company_name,
      referralType: app.referral_type,
      applicationLink: app.application_link,
      companyId: app.company_id,
      jobOfferId: app.job_offer_id,
      location: app.location,
      updatedBy: app.update_by ? dayjs(app.update_by).format('YY-MM-DD') : null  // Formatear el campo `update_by`
    };
  });

  // Retornamos las aplicaciones en formato JSON
  return new Response(JSON.stringify(apps), { status: 200 });
}
