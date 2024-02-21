import { getUserFromToken } from "@/helpers/getUserFromToken";
import { Post } from "@/model/postModel";
import { UserDetail } from "@/model/userDetail";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/userModel";
import { connectDB } from "@/dbConfig/dbconfig";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const { postData } = await request.json();
    console.log(postData);
    const loggedUserId = await getUserFromToken(request);
    console.log(loggedUserId);
    const newPost = new Post({
      url: postData.postUrl,
      caption: postData.caption,
      author: loggedUserId,
    });
    console.log(newPost);
    await newPost.save();

    return NextResponse.json({ success: true, newPost });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const loggedUserId = await getUserFromToken(request);

    const post = await Post.find({ author: loggedUserId });
    const loggedUser = await User.findOne({ _id: loggedUserId });

    return NextResponse.json({ success: true, post, loggedUser });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
