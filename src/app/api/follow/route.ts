import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/userModel";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import { UserDetail } from "@/model/userDetail";
import { connectDB } from "@/dbConfig/dbconfig";

connectDB()
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clickedUser = searchParams.get("user");

    const followedUser = await User.findOne({ username: clickedUser });

    const loggedUserID = await getUserFromToken(request);

    const followedUserDetail = await UserDetail.findOne({
      author: followedUser._id,
    });

    followedUserDetail.follower.push(loggedUserID);

    await followedUserDetail.save();

    const loggedUserDetail = await UserDetail.findOne({
      author: loggedUserID,
    });

    loggedUserDetail.following.push(followedUser._id);

    await loggedUserDetail.save();

    return NextResponse.json({
      success: true,
      loggedUser: loggedUserDetail._id,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
