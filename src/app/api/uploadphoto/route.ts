import { getUserFromToken } from "@/helpers/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/userModel";
export async function POST(request: NextRequest) {
  try {
    const { file } = await request.json();

    const id = await getUserFromToken(request);

    const user = await User.findById(id);

    user.ProfilePhotoName = file.name;
    user.ProfilePhotoUrl = file.url;
    user.showProfilePhoto = true;

    await user.save();

    return NextResponse.json(
      {
        success: true,
        showUserPhoto: user.showProfilePhoto,
        profilePhotoUrl: user.ProfilePhotoUrl,
        username: user.username,
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
