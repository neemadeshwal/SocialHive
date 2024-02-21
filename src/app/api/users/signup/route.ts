import { User } from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectDB } from "@/dbConfig/dbconfig";
import { UserDetail } from "@/model/userDetail";

connectDB();
export async function POST(request: NextRequest) {
  try {
    const { firstname, lastname, username, email, password } =
      await request.json();
    console.log(firstname, lastname, username, email, password);
    const user = await User.findOne({ email });

    if (user) {
      throw NextResponse.json(
        { error: "User already Exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    console.log(newUser);
    await newUser.save();
    console.log(newUser._id);
    const newUserDetail = new UserDetail();
    newUserDetail.author = newUser._id;
    console.log(newUserDetail);
    await newUserDetail.save();

    return NextResponse.json(
      { message: "User successfully Exist", success: true },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
