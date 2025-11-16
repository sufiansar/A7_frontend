import Footer from "@/components/Footer";
import Navbar from "@/components/modules/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="min-h-dvh pt-24">{children}</main>
      <Footer />
    </>
  );
}
