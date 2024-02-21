import { getUserFromToken } from "@/helpers/getUserFromToken";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/model/userModel";
import { UserDetail } from "@/model/userDetail";

export async function POST(request: NextRequest) {
  try {
    console.log("hello");
    const { editData } = await request.json();
    // // const { bio, gender, age, isprivate } = editData;
    console.log(editData);
    console.log("hello agian");

    const loggedUserId = await getUserFromToken(request);

    const loggedUser = await User.findById(loggedUserId);
    const loggedUserDetail = await UserDetail.findOneAndUpdate(
      { author: loggedUserId },
      editData
    );
    await loggedUserDetail.save();
    console.log(loggedUserDetail);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
