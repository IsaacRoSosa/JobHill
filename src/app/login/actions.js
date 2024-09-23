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
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        first_name: formData.get('firstName'),
        last_name: formData.get('lastName'),
        username: formData.get('username'),
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    console.log(error.message);
    return { error: error.message };
  }

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
