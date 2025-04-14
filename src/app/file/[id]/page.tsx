import fs from 'fs';
import path from 'path';
import Image from 'next/image';


const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

export type paramsType = Promise<{ id: string }>;

// Dynamic route page component
export default async function FilePage(props: { params: paramsType }) {
  const { id } = await props.params;

    // Ensure the uploads directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      return (
        <main className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-4">File Not Found</h1>
          <p className="text-gray-600">The uploads directory does not exist.</p>
        </main>
      );
    }
  
    // Find the uploaded file based on the ID
    const files = fs.readdirSync(UPLOAD_DIR);
    const file = files.find((f) => f.startsWith(id));
  
    if (!file) {
      return (
        <main className="flex flex-col items-center p-4">
          <h1 className="text-2xl font-bold mb-4">File Not Found</h1>
          <p className="text-gray-600">The file you are trying to access does not exist or has expired.</p>
        </main>
      );
    }
  
    const fileUrl = `/uploads/${file}`;
  
    return (
      <main className="flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold mb-4">Your Uploaded File</h1>
        {file.endsWith('.pdf') ? (
          <embed src={fileUrl} width="800" height="600" />
        ) : (
          <Image
            src={fileUrl}
            alt="Uploaded File"
            width={800}
            height={600}
            className="max-w-full max-h-96"
          />
        )}
      </main>
    );
}