'use client'
import localFont from "next/font/local";
// import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import AppHeader from '@/components/header';
import AppFooter from "@/components/footer";
import { ToastContainer } from "react-toastify";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppHeader />
        <div className={'py-3'}></div>
        <Container>{children}</Container>
        <div className={'py-3'}></div>

        <AppFooter />
        <ToastContainer />

      </body>
    </html>
  );
}
