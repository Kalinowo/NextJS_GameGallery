import { NextResponse } from "next/server";
import getPosts from "@/actions/getPosts";

export async function GET(request: Request) {
  try {
    const curr = await getPosts();
    return NextResponse.json(curr);
  } catch (error: any) {
    console.log(error, "GET_ERROR");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
