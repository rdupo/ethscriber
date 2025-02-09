import localFont from "next/font/local";
import "./globals.css";
import { WalletProvider } from ".//contexts/WalletContext";
import toast, { Toaster } from 'react-hot-toast';

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

export const metadata = {
  title: "(Ph)remix",
  description: "Ethscribe your (Ph)remix",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <WalletProvider>
            <Toaster/>
            {children}
          </WalletProvider>
        </body>
      </html>
  );
}
