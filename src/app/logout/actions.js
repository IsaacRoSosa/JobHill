'use server'

import { createClient } from '/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function logout(formData) {
    const supabase = createClient()

    const { error } = await supabase.auth.signOut()
  
    if (error) {
      //get the error message
      console.log(error.message)
      redirect('/error')
    }
  
    revalidatePath('/login')
    revalidatePath('/applications')
    revalidatePath('/jobs')
    revalidatePath('/friends')
    revalidatePath('/news')
    revalidatePath('/')

    redirect('/login')
  }