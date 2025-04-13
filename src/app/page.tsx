'use client';

import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [isQrCodeExpired, setIsQrCodeExpired] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && (uploadedFile.type.includes('image') || uploadedFile.type.includes('pdf'))) {
      const fileBlobUrl = URL.createObjectURL(uploadedFile);
      setFile(uploadedFile);
      setFileUrl(fileBlobUrl);

      const uniqueId = uuidv4();
      setQrCodeData(`${window.location.origin}/file/${uniqueId}`);
      setIsQrCodeExpired(false);

      // Set a 2-minute expiration timer
      setTimeout(() => {
        setIsQrCodeExpired(true);
      }, 2 * 60 * 1000); // 2 minutes in milliseconds
    } else {
      alert('Please upload a valid image or PDF file.');
    }
  };

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Upload File & Generate QR Code</h1>
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="mb-4 border p-2"
      />
      {fileUrl && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Uploaded File Preview:</h2>
          {file?.type.includes('pdf') ? (
            <embed src={fileUrl} width="500" height="600" />
          ) : (
            <img src={fileUrl} alt={file?.name} className="max-w-full max-h-96" />
          )}
        </div>
      )}
      {qrCodeData && !isQrCodeExpired && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Scan QR Code to Access File:</h2>
          <QRCodeCanvas value={qrCodeData} size={200} />
        </div>
      )}
      {isQrCodeExpired && (
        <div className="text-red-500 font-semibold">
          <h2>QR Code Expired</h2>
        </div>
      )}
    </main>
  );
}