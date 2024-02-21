import { NextRequest, NextResponse } from "next/server";
import { getUserFromToken } from "@/helpers/getUserFromToken";
import { User } from "@/model/userModel";
import { connectDB } from "@/dbConfig/dbconfig";

connectDB();
export async function GET(request: NextRequest) {
  try {
    const userId = await getUserFromToken(request);

    const loggedUser = await User.findById(userId).select("-password");
    const allUsers = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );

    return NextResponse.json({ success: true, loggedUser, allUsers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
