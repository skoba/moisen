import { FaUserDoctor } from "react-icons/fa6";

export const metadata = {
  title: '電子カルテ作成・共有アプリ',
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>もいせん病院電子カルテ</h1>

      <h2>メニュー</h2>

      <ul>
        <li><a href="/encounter">診察</a></li>
      </ul>

      <button className="btn">btn</button>

      <FaUserDoctor className="m-4 text-xl text-gray-600" />
    </main>
  );
}
