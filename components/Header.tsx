// components/Header.tsx
'use client';

import Image from "next/image";
import Link from "next/link";

const socialIcons = [
    { href: "#", icon: "/icons/x.svg", alt: "Twitter" },
    { href: "#", icon: "/icons/linkedln.svg", alt: "LinkedIn" },
    { href: "#", icon: "/icons/facebook.svg", alt: "Facebook" },
    { href: "#", icon: "/icons/youtube.svg", alt: "YouTube" },
    { href: "#", icon: "/icons/instagram.svg", alt: "Instagram" },
    { href: "#", icon: "/icons/tiktok.svg", alt: "TikTok" },
];

export default function Header() {
    return (
        <header className="w-full px-6 md:px-20 py-4 hidden md:flex items-center justify-between bg-white shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link href="/">
                <Image 
                    src="/logo.svg" 
                    alt="Citinet Logo" 
                    width={80} 
                    height={40}
                    className="md:w-[100px] md:h-[50px]"
                />
                </Link>
            </div>

            {/* Socials - Hidden on mobile, shown on desktop */}
            <div className="flex items-center gap-4">
                {socialIcons.map(({ href, icon, alt }) => (
                    <Link key={alt} href={href}>
                        <Image 
                            src={icon} 
                            alt={alt} 
                            width={15} 
                            height={15}
                            className="hover:opacity-80 transition-opacity"
                        />
                    </Link>
                ))}
            </div>
        </header>
    );
}
