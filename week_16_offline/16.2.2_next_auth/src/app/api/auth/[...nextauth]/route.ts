import NextAuth from "next-auth";
import {NEXT_AUTH} from "@/app/lib/auth"
// import { NextRequest, NextResponse } from "next/server";

// export function GET(req: NextRequest, {params}:{params:{authRoutes:string[]}}) {
//     console.log("------->",params?.authRoutes)
//   return NextResponse.json({
//     message: "Handler",
//   });
// }

const handler = NextAuth(NEXT_AUTH);

export const GET = handler;
export const POST = handler;
