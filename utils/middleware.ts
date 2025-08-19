import { NextResponse, type NextRequest } from 'next/server'
import { getUser, updateSession } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest, response: NextResponse) {
    const protectedRoutes = ['/home']
    const path = new URL(request.url).pathname
    const { data: { user } } = await getUser(request, response)
    if (protectedRoutes.includes(path) && !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return await updateSession(request)
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}