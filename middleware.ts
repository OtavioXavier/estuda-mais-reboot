import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req: NextRequest) {
    // update user's auth session
    const res = NextResponse.next();
    try {
        const supabase = createMiddlewareClient({req, res});
        await supabase.auth.getSession()
    } catch (error) {
        
    }
    return res;
}
