import type { Metadata } from "next";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import "./globals.css";
import ThemeProviderWrapper from "@/providers/ThemeProviderWrapper";
import { BonusProvider } from "@/providers/BonusContext";

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
      <BonusProvider>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </BonusProvider>
    </AppRouterCacheProvider>
    </html>
  );
}
