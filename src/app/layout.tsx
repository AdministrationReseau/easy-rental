import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import { PoppinsRegular } from '@/fonts'

export const metadata: Metadata = {
  title: "Easy Rent",
  description: "Rental made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <AppRouterCacheProvider>
      <body
        className={PoppinsRegular.className}
      >
        {children}
      </body>
    </AppRouterCacheProvider>
    </html>
  );
}
