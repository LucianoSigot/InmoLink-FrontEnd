export default function NoFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-800" >
      <h1 className="text-9xl text-blue-50 underline">Error 404</h1>

      <img 
        src="/Error404.png"
        alt="Error 404"
        className="mt-6"
      />
    </div>
  );
}
