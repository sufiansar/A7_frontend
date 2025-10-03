import LoginForm from "@/components/modules/Auth/Login/LoginForm";
import { GalleryVerticalEnd } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="bg-blue-600 text-white flex h-10 w-10 items-center justify-center rounded-lg group-hover:bg-blue-700 transition-colors">
              <GalleryVerticalEnd className="h-5 w-5" />
            </div>
            <span className="text-xl font-semibold text-white">PortFolio</span>
          </Link>
        </div>

        <div className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
