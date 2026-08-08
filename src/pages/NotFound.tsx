import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/ui/Button.tsx";
import Card from "../components/ui/Card.tsx";

export default function NotFound() {
  
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = "Beo Base | Error Page";
  }, []);
  
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <Card>
        <div className="w-full max-w-2xl text-center">
          
          {/* Error Code */}
          <p className="text-8xl font-black tracking-tight text-stone-100 sm:text-9xl">
            404
          </p>
          
          {/* Title */}
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-stone-100 sm:text-4xl">
            Page Not Found
          </h1>
          
          {/* Description */}
          <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-gray-300 sm:text-lg">
            The page you are looking for doesn’t exist or may still be under
            construction.
          </p>
          
          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row mb-6">
            <Button onClick={() => navigate(-1)}>
              Previous Page
            </Button>
            
            <Button variant="secondary" onClick={() => navigate("/")}>
              Go Back Home
            </Button>
          </div>
        
        </div>
      </Card>
    </main>
  );
}