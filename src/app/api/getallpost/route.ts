import { NextRequest, NextResponse } from "next/server";
import { Post } from "@/model/postModel";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import { UserDetail } from "@/model/userDetail";
import { User } from "@/model/userModel";
import { connectDB } from "@/dbConfig/dbconfig";
connectDB();
export async function GET(request: NextRequest) {
  try {
    console.log("hello");
    const authorId = await getUserFromToken(request);

    const userDetail = await Post.find({});

    // .populate("user");
    console.log(userDetail);
    return NextResponse.json({ success: true, userDetail });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
