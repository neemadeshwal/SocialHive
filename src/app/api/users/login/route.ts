import { NextRequest, NextResponse } from "next/server";

import { User } from "@/model/userModel";
// import { User } from "@/model/userModel";

import jwt from "jsonwebtoken";

import bcryptjs from "bcryptjs";
import { connectDB } from "@/dbConfig/dbconfig";
connectDB();
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      throw NextResponse.json({ error: "User doesn't Exist" }, { status: 400 });
    }

    const checkPass = await bcryptjs.compare(password, user.password);

    if (!checkPass) {
      throw NextResponse.json(
        { error: "Authentication error.Password is Incorrect" },
        { status: 400 }
      );
    }

    const tokenData = {
      id: user._id,
      name: user.username,
      email: user.email,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      { message: "login successful", success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
