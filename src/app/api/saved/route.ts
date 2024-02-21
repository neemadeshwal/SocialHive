import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/model/postModel";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import { UserDetail } from "@/model/userDetail";
import { User } from "@/model/userModel";
export async function POST(request: NextRequest) {
  try {
    const { clickedPostId } = await request.json();
    const clickedPost = await Post.findById(clickedPostId);
    const loggedUserId = await getUserFromToken(request);
    const loggedUserDetail = await UserDetail.findOne({
      author: loggedUserId,
    });
    loggedUserDetail.savedpost.push(clickedPost);
    await loggedUserDetail.save();

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const loggedUserId = await getUserFromToken(request);

    const loggedUserDetail = await UserDetail.findOne({
      author: loggedUserId,
    }).populate("savedpost");

    console.log(loggedUserDetail);

    const loggedUser = await User.findById(loggedUserId);

    return NextResponse.json({ success: true, loggedUserDetail, loggedUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
