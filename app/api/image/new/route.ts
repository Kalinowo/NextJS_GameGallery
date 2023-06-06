import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { image, userId } = body;
    const post = await prisma.post.create({
      data: {
        image: image,
        userId: userId,
      },
    });
    console.log(post);
    return NextResponse.json(post);
  } catch (error: any) {
    console.log(error, "POST_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
