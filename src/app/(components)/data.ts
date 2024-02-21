// // // pages/api/upload.js

// // import multer from 'multer';
// // import path from 'path';

// // const upload = multer({
// //   dest: './public/uploads', // Destination folder for uploaded files
// // });

// // export default async function handler(req, res) {
// //   try {
// //     upload.single('image')(req, res, (err) => {
// //       if (err) {
// //         console.error('Error uploading file:', err);
// //         return res.status(500).json({ error: 'Error uploading file' });
// //       }

// //       // File uploaded successfully
// //       const imagePath = req.file.path;
// //       const imageUrl = path.join('/uploads', req.file.filename);

// //       return res.status(200).json({ imageUrl });
// //     });
// //   } catch (error) {
// //     console.error('Error handling upload:', error);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // }


// const imageURL = `${req.protocol}://${req.get('host')}/${req.file.path}`;

// // backend/api/upload.js
// import multer from 'multer';
// import connectDB from '../../utils/connectDB';
// import ImageModel from '../../models/Image';

// connectDB();

// const upload = multer({ dest: 'uploads/' });

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     upload.single('file')(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(400).json({ message: 'File upload error' });
//       } else if (err) {
//         return res.status(500).json({ message: 'Internal server error' });
//       }

//       const { originalname, path } = req.file;

//       try {
//         const image = new ImageModel({ name: originalname, path });
//         await image.save();
//         return res.status(201).json({ message: 'File uploaded successfully' });
//       } catch (error) {
//         return res.status(500).json({ message: 'Internal server error' });
//       }
//     });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }



// import { writeFile } from 'fs/promises'
// import { NextRequest, NextResponse } from 'next/server'
// import { join } from 'path'

// export async function POST(request: NextRequest) {
//   const data = await request.formData()
//   const file: File | null = data.get('file') as unknown as File

//   if (!file) {
//     return NextResponse.json({ success: false })
//   }

//   const bytes = await file.arrayBuffer()
//   const buffer = Buffer.from(bytes)

//   // With the file data in the buffer, you can do whatever you want with it.
//   // For this, we'll just write it to the filesystem in a new location
//   const path = join('/', 'tmp', file.name)
//   await writeFile(path, buffer)
//   console.log(`open ${path} to see the uploaded file`)

//   return NextResponse.json({ success: true })
// }

// 'use client'

// import { useState } from 'react'

// export function UploadForm() {
//   const [file, setFile] = useState<File>()

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!file) return

//     try {
//       const data = new FormData()
//       data.set('file', file)

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: data
//       })
//       // handle the error
//       if (!res.ok) throw new Error(await res.text())
//     } catch (e: any) {
//       // Handle errors here
//       console.error(e)
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="file"
//         name="file"
//         onChange={(e) => setFile(e.target.files?.[0])}
//       />
//       <input type="submit" value="Upload" />
//     </form>
//   )
// }


// pages/api/upload.js
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({ dest: 'uploads/' });

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    try {
        upload.single('image')(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A Multer error occurred when uploading.
                return res.status(500).json({ error: err.message });
            } else if (err) {
                // An unknown error occurred when uploading.
                return res.status(500).json({ error: 'An error occurred while uploading image' });
            }

            const tempPath = req.file.path;
            const targetPath = path.join(__dirname, '../../public/uploads/', `${uuidv4()}${path.extname(req.file.originalname)}`);

            fs.rename(tempPath, targetPath, function (error) {
                if (error) {
                    return res.status(500).json({ error: 'An error occurred while moving uploaded image' });
                }

                // Return the URL of the uploaded image
                const imageURL = targetPath.replace(/^.*public\//, '/');
                res.status(201).json({ imageURL });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
