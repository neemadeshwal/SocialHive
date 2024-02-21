import { connectDB } from "@/dbConfig/dbconfig";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import { Post } from "@/model/postModel";
import { NextRequest, NextResponse } from "next/server";
connectDB();
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    const likedPost = await Post.findById(id);

    const loggedUserId = await getUserFromToken(request);

    likedPost.likes.push(loggedUserId);

    await likedPost.save();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
