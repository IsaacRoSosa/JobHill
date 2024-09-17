import { redirect } from 'next/navigation'
import { createClient } from '/utils/supabase/server'

export default async function PrivatePage() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.session) {
    console.log('User is not authenticated:', error?.message)
    redirect('/login')
    return null
  }

  return <p>Hello {data.session.user.email}</p>
}
