import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";
import { LoginForm } from "@/components/modules/Auth/Login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#363636] px-4">
      <div className="w-full max-w-md bg-[#2c2c2c] rounded-xl shadow-lg p-8 md:p-12 flex flex-col gap-6">
        <div className="flex justify-center items-center gap-2 text-white">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="h-4 w-4" />
            </div>
            PortFolio
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
