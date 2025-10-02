// components/BlogCard.tsx
// import { BlogCardProps } from "@/types";
// import Image from "next/image";
// import Link from "next/link";

// const BlogCard = ({
//   title,
//   slug,
//   excerpt,
//   coverImage,
//   tags,
//   published,
// }: BlogCardProps) => {
//   return (
//     <div className="group relative bg-gradient-to-br from-gray-900/50 to-black/70 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 hover:shadow-2xl hover:shadow-black/50">
//       {/* Glow effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl"></div>

//       {coverImage && (
//         <div className="relative w-full h-48 overflow-hidden">
//           <Image
//             src={coverImage}
//             alt={title}
//             fill
//             className="object-cover group-hover:brightness-110"
//           />
//           {/* Image overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100"></div>

//           {/* Status badge */}
//           <div className="absolute top-4 right-4">
//             {published ? (
//               <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
//                 Published
//               </span>
//             ) : (
//               <span className="px-3 py-1 bg-yellow-500/90 text-black text-xs font-medium rounded-full backdrop-blur-sm">
//                 Draft
//               </span>
//             )}
//           </div>
//         </div>
//       )}
//       <div className="relative p-6 space-y-4">
//         <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text line-clamp-2">
//           {title}
//         </h3>

//         <p className="text-gray-400 leading-relaxed line-clamp-3 group-hover:text-gray-300">
//           {excerpt}
//         </p>

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2">
//           {tags.slice(0, 3).map((tag) => (
//             <span
//               key={tag}
//               className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full backdrop-blur-sm border border-white/20 hover:bg-white/20"
//             >
//               #{tag}
//             </span>
//           ))}
//           {tags.length > 3 && (
//             <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-gray-300 text-sm rounded-full backdrop-blur-sm border border-purple-500/30">
//               +{tags.length - 3} more
//             </span>
//           )}
//         </div>

//         {/* Read More / Draft */}
//         <div className="pt-4">
//           {published ? (
//             <Link
//               href={`/blogs/${slug}`}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-full hover:shadow-lg hover:shadow-purple-500/25 group"
//             >
//               Read More
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 8l4 4m0 0l-4 4m4-4H3"
//                 />
//               </svg>
//             </Link>
//           ) : (
//             <div className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700/50 text-gray-400 font-medium rounded-full cursor-not-allowed backdrop-blur-sm">
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                 />
//               </svg>
//               Draft
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;
