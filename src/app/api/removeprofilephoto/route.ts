import { getUserFromToken } from "@/helpers/getUserFromToken";
import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";

import { connectDB } from "@/dbConfig/dbconfig";

connectDB();

export async function GET(request: NextRequest) {
  try {
    const id = await getUserFromToken(request);

    const user = await User.findById(id);

    if (!user) {
      throw NextResponse.json({ error: "No user found" }, { status: 400 });
    }

    user.showProfilePhoto = false;
    user.ProfilePhotoName = "";
    user.ProfilePhotoUrl = "";

    await user.save();

    return NextResponse.json(
      { success: true, showUserPhoto: user.showProfilePhoto },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
