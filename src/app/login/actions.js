'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) { 
    console.log(error.message)

    return { error: error.message };    
  }

  revalidatePath('/', 'layout')
  redirect('/jobs')
}

export async function signup(formData) {
  const supabase = createClient();
  
  // Registro del usuario con display name
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
      }
    }
  });

  if (signUpError) {
    console.log(signUpError.message);
    return { error: signUpError.message };
  }

  // Si el registro es exitoso, obtenemos el user_id generado
  const userId = signUpData.user.id;

  // Insertamos los datos adicionales en la tabla users
  const { error: userInsertError } = await supabase
    .from('users')
    .insert([
      {
        user_id: userId, // Usamos 'user_id' en lugar de 'id'
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        username: formData.get('username'),
      },
    ]);

  if (userInsertError) {
    console.log(userInsertError.message);
    return { error: userInsertError.message };
  }

  // Finalmente, revalidamos y redirigimos
  revalidatePath('/', 'layout');
  redirect('/');
}

export async function loginWithOAuth() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
    },
  })

  console.log('OAuth data:', data)
  console.log('OAuth error:', error)

  if (error) {
    console.error("OAuth login error:", error.message)
    return { error: error.message }
  }

  if (data.url) {
    console.log('Redirecting to:', data.url)
    redirect(data.url)
  }
}
