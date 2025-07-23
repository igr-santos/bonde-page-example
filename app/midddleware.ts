import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    if (url.pathname === '/editor') {
        const site = url.hostname;
        return NextResponse.redirect(`https://editor.bonde.devel/admin?site=${site}`);
    }

    return NextResponse.next();
}