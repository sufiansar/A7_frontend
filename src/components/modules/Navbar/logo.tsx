import Image from "next/image";

export const Logo = () => (
  <div className="relative group">
    {/* Animated glow effect */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-pink-500/40 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

    {/* Rotating border effect (static) */}
    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

    {/* Main logo container */}
    <div className="relative bg-gradient-to-br from-white/20 to-white/5 p-1 rounded-full border-2 border-white/30 backdrop-blur-sm group-hover:scale-110 group-hover:border-white/50 transition-all duration-300 shadow-lg group-hover:shadow-xl">
      <div className="relative rounded-full overflow-hidden bg-gradient-to-br from-gray-800 to-black p-0.5">
        <Image
          className="rounded-full object-cover shadow-lg group-hover:shadow-xl transition-shadow duration-300"
          width={48}
          height={48}
          src="/images/profile.jpg"
          alt="Md. Abu Sufian - Portfolio Logo"
          priority
        />

        {/* Online status indicator */}
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black shadow-lg"></div>
      </div>
    </div>

    {/* Floating particles effect */}
    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
    <div
      className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={{}}
    ></div>
    <div
      className="absolute top-0 left-0 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
      style={{}}
    ></div>
  </div>
);
