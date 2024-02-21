"use client";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Button() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);

  async function UploadPhoto() {
    const response = await axios.post("/api/uploadphoto", { file });
    console.log(response);
    router.push(`/`);
  }
  useEffect(() => {
    if (file) {
      UploadPhoto();
    }
  }, [file]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setFile(res[0]);
          console.log("Files: ", res);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
