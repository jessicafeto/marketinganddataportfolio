import type { Metadata } from "next";
import "./globals.css";

// Locked interim stack: Switzer (grotesk) + Zodiak (editorial serif),
// self-hosted via @font-face in globals.css. Söhne + Tiempos are the
// production commercial cuts.

export const metadata: Metadata = {
  title: "noova — one studio. one system. no handoffs.",
  description:
    "noova is a brand and innovation studio. We build the whole system — strategy, identity, website and marketing engine — then stay on as its architect.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-paper font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
