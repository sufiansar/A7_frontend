import Image from "next/image";

export const Logo = () => (
  <div className="relative group">
   
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>

  
    <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-full border border-white/20 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
      <Image
        className="rounded-full object-cover shadow-lg"
        width={50}
        height={50}
        src="/images/profile.jpg"
        alt="Md. Abu Sufian - Portfolio Logo"
        priority
      />
    </div>
  </div>
);
