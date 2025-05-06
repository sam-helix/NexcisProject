"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { navitems } from "@/components/constact";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignIn = () => {
    router.push('/sign-in');
  };

  const handleSignUp = () => {
    router.push('/sign-up');
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Sidebar */}
      <section className="sidebar">
        <nav className="flex flex-col items-center gap-4 w-full">
          <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
            <Image
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
              className="size-[24px] max-xl:size-14"
            />
            <h1 className="sidebar-logo">Horizon</h1>
          </Link>
          {navitems.map((item) => {
            const isActive =
              pathname === item.route || pathname.startsWith(`${item.route}/`);
            return (
              <Link
                key={item.id}
                href={item.route}
                className={`text-[20px] font-medium ${isActive ? "text-black" : "text-gray-500"}`}
              >
                <p className="">{item.name}</p>
              </Link>
            );
          })}
          <div className="flex gap-2 mt-4">
            <Button
              type="button"
              className="form-btn"
              onClick={handleSignIn}
            >
              SignIn
            </Button>
            <Button
              type="button"
              className="form-btn"
              onClick={handleSignUp}
            >
              SignUp
            </Button>
          </div>
        </nav>
      </section>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {children}
        <div className="flex justify-center mt-8 gap-2 text-center">
          <div className="p-4 border rounded-xl border-gray-400 box-shadow shadow-lg">Terms & conditions</div>
        </div>
      </main>
    </div>
  );
}
