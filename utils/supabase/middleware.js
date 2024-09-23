import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Rutas que deseas proteger
  const protectedRoutes = ['/jobs', '/applications', '/friends', '/news']

  // Verificar si la ruta actual es una ruta protegida
  const currentPath = request.nextUrl.pathname

  const isProtectedRoute = protectedRoutes.some((route) => currentPath.startsWith(route))

  if (!user && isProtectedRoute) {
    // Usuario no autenticado intentando acceder a una ruta protegida
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Retornar la respuesta del middleware
  return supabaseResponse
}
