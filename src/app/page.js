import Image from "next/image";

export const metadata = {
  title: 'ホーム'
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
    </main>
  );
}
