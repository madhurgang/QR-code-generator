import fs from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

interface FilePageProps {
  params: {
    id: string;
  };
}

export default function FilePage({ params }: FilePageProps) {
  const { id } = params;
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
        <img src={fileUrl} alt="Uploaded File" className="max-w-full max-h-96" />
      )}
    </main>
  );
}