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

    //esperamos 5 segundos antes de redirigir a la página de login
    await new Promise((resolve) => setTimeout(resolve, 5000))
    redirect('/login')
    
  }

  revalidatePath('/', 'layout')
  redirect('/jobs')
}

export async function signup(formData) {
  const supabase = createClient()
  const data = {
    email: formData.get('email-signup'),
    password: formData.get('password-signup'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error.message)

    //esperamos 5 segundos antes de redirigir a la página de login
    await new Promise((resolve) => setTimeout(resolve, 5000))

    redirect('/login')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function loginWithOAuth(provider) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: './auth/callback', // Asegúrate de que esta URL esté correctamente configurada
    },
  })

  if (data?.url) {
    redirect(data.url)
  }

  if (error) {
    console.error("OAuth login error:", error.message)
    //obtenemos el mensaje de error 
    console.log(error.message)
  }else{
    redirect('/jobs')
  }

  
}