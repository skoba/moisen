import Navbar from './_/components/Navbar';
import { Inter } from "next/font/google";
import "./globals.css";
import EventHandler from './_/components/EventHandler';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: '電子カルテ作成・共有アプリ',
    template: '%s | 電子カルテ作成・共有アプリ'
  },
  description: "このソフトウェアは「第3回メディカルハッカソン」で作られたものです。病院を受診したときに、いろいろな検査を受けることになりますが、どのような意図があってその検査を受けることになったのかよくわからないことがあります。どのような疾患を疑ってこの検査を医師が患者に提案し、患者側もそれを理解して検査を受けるという流れをITを使って可視化したいというのがこのソフトウェアでの提案内容です。",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <EventHandler />
      </body>
    </html>
  );
}
