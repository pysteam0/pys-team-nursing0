import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PYS TEAM | منصة تمريض اليرموك",
  description: "المنصة الأكاديمية الأولى لطلبة التمريض في جامعة اليرموك - شروحات وبنوك أسئلة",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#0a0f1d] text-slate-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}