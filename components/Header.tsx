// components/Header.tsx
'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
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
        <header className="w-full px-20 py-4 flex items-center justify-between bg-white shadow-sm">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Citinet Logo" width={100} height={100} />
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4">
                {socialIcons.map(({ href, icon, alt }) => (
                    <Link key={alt} href={href}>
                        <Image src={icon} alt={alt} width={15} height={15} />
                    </Link>
                ))}
            </div>
        </header>
    );
}
