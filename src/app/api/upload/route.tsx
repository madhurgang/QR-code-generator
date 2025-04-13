import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file || !(file.type.includes('image') || file.type.includes('pdf'))) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Ensure the upload directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    // Generate unique ID for the file
    const id = nanoid();
    const fileExtension = file.name.split('.').pop();
    const filePath = path.join(UPLOAD_DIR, `${id}.${fileExtension}`);

    // Save the file to the uploads directory
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, fileBuffer);

    // Return the unique file ID
    return NextResponse.json({ id, fileName: `${id}.${fileExtension}` });
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
  }
}