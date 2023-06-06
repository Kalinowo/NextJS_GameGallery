import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const get = await prisma.post.findMany({});
    return NextResponse.json(get);
  } catch (error: any) {
    console.log(error, "GET_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
