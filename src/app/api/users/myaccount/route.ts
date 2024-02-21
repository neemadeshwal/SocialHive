import { getUserFromToken } from "@/helpers/getUserFromToken";
import { UserDetail } from "@/model/userDetail";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userid = await getUserFromToken(request);
    const user = await User.findById(userid).select("-password");
    const userdetail = await UserDetail.findOne({ author: userid });
    return NextResponse.json({ success: true, response: user, userdetail });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
