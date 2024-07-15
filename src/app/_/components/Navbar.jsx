"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { FaUserDoctor } from "react-icons/fa6";

export default function Navbar() {
  const currentPath = usePathname();

  return (
    <nav className="flex justify-center items-center p-4 bg-[rgb(var(--background-end-rgb))] border-b border-gray-300">
      <div className="flex items-center text-2xl font-bold">
        電子カルテ
        <FaUserDoctor className="ml-2" />
      </div>
      <div className="absolute right-4 flex">
        <Link href="/patient" className={twMerge(
          "px-4 py-2 rounded",
          currentPath === '/patient' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
        )}>
          患者画面
        </Link>
        <Link href="/encounter" className={twMerge(
          "px-4 py-2 ml-2 rounded",
          currentPath === '/encounter' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
        )}>
          診察画面
        </Link>
      </div>
    </nav>
  );
}