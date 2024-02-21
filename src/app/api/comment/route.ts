import { getUserFromToken } from "@/helpers/getUserFromToken";
import { Post } from "@/model/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { commentData } = await request.json();
    const { clickedPostId, comment } = commentData;
    console.log(commentData);
    const clickedPost = await Post.findById(clickedPostId);
    const loggedUserId = await getUserFromToken(request);

    clickedPost.comment.push({ commentby: loggedUserId, comment });

    await clickedPost.save();

    return NextResponse.json({ success: true, commentData });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
