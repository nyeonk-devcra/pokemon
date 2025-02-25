import type { Metadata } from "next";

import "./globals.css";

import { pretendardStd } from "@/components/fonts";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "포켓몬 도감",
  description: "클라이언트 파트 수행 과제",
  icons: {
    icon: "/pokeball.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={clsx(
          "font-pretendardStd flex h-full",
          pretendardStd.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
