import { UserDetail } from "@/model/userDetail";
import { NextRequest, NextResponse } from "next/server";

import { User } from "@/model/userModel";
import { getUserFromToken } from "@/helpers/getUserFromToken";

import { connectDB } from "@/dbConfig/dbconfig";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clickedUser = searchParams.get("user");

    const loggedUserID = await getUserFromToken(request);
    const UnfollowedUser = await User.findOne({ username: clickedUser });

    const UnfollowedUserDetail = await UserDetail.findOne({
      author: UnfollowedUser._id,
    });

    UnfollowedUserDetail.follower = UnfollowedUserDetail.follower.filter(
      (item) => item.toString() !== loggedUserID
    );

    const loggedUserDetail = await UserDetail.findOne({ author: loggedUserID });

    loggedUserDetail.following = loggedUserDetail.following.filter(
      (item) => item.toString() !== UnfollowedUser._id
    );

    await UnfollowedUserDetail.save();
    await loggedUserDetail.save();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: any) {
    console.log(err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
