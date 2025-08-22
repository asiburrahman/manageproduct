import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

 
// This function can be marked `async` if using `await` inside
export const middleware = async (req) => {
//   return NextResponse.redirect(new URL('/home', request.url))
console.log("From Middleware", req.nextUrl.pathname );
const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        secureCookie: process.env.NODE_ENV === "production" ? true : false,
    })

    if (token) {

        return NextResponse.next()
    } else {
        return NextResponse.redirect(new URL('/login', req.url))
    }


}
 
export const config = {
  matcher: [
        '/add-product'
    ],
}