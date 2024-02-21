import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function getUserFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET!);
    return decodedToken.id;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
