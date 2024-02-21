import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const Response = NextResponse.json({
      success: true,
      message: "Logout Successful",
    });

    Response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return Response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
