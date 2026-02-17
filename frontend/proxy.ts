import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = 	new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(request: NextRequest){
	const token = request.cookies.get("access_token")?.value;
	const {pathname} = request.nextUrl;

	const isProtectedroute = pathname.startsWith('/dashboard') || pathname.startsWith('/polls/create');
	if (isProtectedroute){
		if (!token){
			return NextResponse.redirect(new URL('/auth', request.url));
		}
		try {
			await jwtVerify(token, SECRET);
			return NextResponse.next();
		}
		catch(err){
			const response = NextResponse.redirect(new URL('/auth', request.url));
			response.cookies.delete('access_token');
			return response;
		}
	}
	return NextResponse.next();
}

export const config = { matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)" };
