import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sport Facility Management Software | Swift",
  description: "Recreation of runswiftapp.com UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
