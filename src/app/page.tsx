'use client';

import { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

export default function Home() {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    if (!(uploadedFile.type.includes('image') || uploadedFile.type.includes('pdf'))) {
      setError('Please upload a valid image or PDF file.');
      return;
    }
    setError(null);

    // Upload the file to the server
    const formData = new FormData();
    formData.append('file', uploadedFile);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      setQrCodeData(`${window.location.origin}/file/${result.id}`);
    } else {
      setError(result.error || 'File upload failed');
    }
  };

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Upload File & Generate QR Code</h1>
      <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="mb-4 border p-2" />
      {error && <p className="text-red-500">{error}</p>}
      {qrCodeData && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Scan QR Code to Access File:</h2>
          <QRCodeCanvas value={qrCodeData} size={200} />
        </div>
      )}
    </main>
  );
}