import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/userModel";
import { UserDetail } from "@/model/userDetail";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import { connectDB } from "@/dbConfig/dbconfig";

connectDB();
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clickedUser = searchParams.get("user");
    console.log(clickedUser);

    const user = await User.findOne({ username: clickedUser }).select(
      "-password"
    );
    const userdetail = await UserDetail.findOne({ author: user._id });
    const loggedUserID = await getUserFromToken(request);

    return NextResponse.json({
      succcess: true,
      user: user,
      userdetail,
      loggedUserID,
    });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
