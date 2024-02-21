import { NextRequest, NextResponse } from "next/server";
// import { bodyParser } from "next/dist/server/api-utils";
import multer from "multer";
import { connectDB } from "@/dbConfig/dbconfig";
import { User } from "@/model/userModel";
import { writeFile } from "fs/promises";
import { join } from "path";
import { upload } from "@/helpers/multer";

connectDB();

export async function POST(request: NextRequest, { params }: any) {
  try {
    const response = await upload.single("image")(request, NextResponse);
    console.log("file updated successfully");
    console.log(response);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    // try {
    //   const { id } = params;
    //   console.log(id);

    //   try {
    //     await upload.single("image")(request, NextResponse);
    //     console.log("File uploaded successfully");
    //     return NextResponse.json({ success: true });
    //   } catch (err) {
    //     if (err instanceof multer.MulterError) {
    //       console.log("multererror");
    //       return NextResponse.json(
    //         { error: "multer error occured" },
    //         { status: 400 }
    //       );
    //     } else {
    //       console.log("server error");
    //       return NextResponse.json(
    //         { error: "internal server error" },
    //         { status: 500 }
    //       );
    //     }
    //   }

    // const response1 = upload.single("image")(
    //   request,
    //   NextResponse,
    //   async function (err: any) {
    //     if (err instanceof multer.MulterError) {
    //       console.log("multererror");
    //       return NextResponse.json(
    //         { error: "multer error occured" },
    //         { status: 400 }
    //       );
    //     } else if (err) {
    //       console.log("server error");
    //       return NextResponse.json(
    //         { error: "internal server error" },
    //         { status: 500 }
    //       );
    //     }
    //   }
    // );
    // console.log("does it work??");
    // console.log(response1);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
