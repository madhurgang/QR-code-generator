export default function FilePage({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <main className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">File Access Page</h1>
      <p className="text-lg">Unique File ID: {id}</p>
      <p className="text-gray-600">The actual file access logic would go here.</p>
    </main>
  );
}