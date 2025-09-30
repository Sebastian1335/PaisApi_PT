// import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<p>Cargando...</p>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
