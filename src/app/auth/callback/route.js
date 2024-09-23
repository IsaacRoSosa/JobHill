import { NextResponse } from 'next/server'
import { createClient } from '/utils/supabase/server'

export async function GET(request) {
  console.log('Auth callback route reached')
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  console.log('Received code:', code)
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error.message)
      return NextResponse.redirect(`${origin}/auth/auth-code-error`)
    }
    // Redirige al usuario a la ruta correspondiente
    return NextResponse.redirect(`${origin}${next}`)
  }

  // Manejo de errores si no hay código
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
