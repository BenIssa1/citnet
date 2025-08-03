'use client';

import Link from "next/link";
import Image from "next/image";
import { Input } from "./ui/input";

const links = [
    "Catégories",
    "Outils",
    "Agences",
    "Écoles",
    "Événements",
    "Ressources",
    "Shops",
    "Contact",
];

export default function Navbar() {
    return (
        <nav className="w-full border-b bg-black  px-20 py-6 flex items-center justify-between gap-6 text-sm font-medium">
            {/* Icône menu (peut déclencher un drawer plus tard) */}
            <span></span>

            {/* Liens de navigation */}
            <div className="flex items-center gap-6 flex-wrap">
                <button>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="Search"
                        width={16}
                        height={16}
                    />
                </button>

                {links.map((link) => (
                    <Link
                        key={link}
                        href="#"
                        className="text-white hover:text-blue-600 transition-colors"
                    >
                        {link}
                    </Link>
                ))}
            </div>

            {/* Search bar */}
            <div className="relative w-[220px]">
                <Image
                    src="/icons/search.svg"
                    alt="Search"
                    width={16}
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                />
                <Input
                    type="text"
                    placeholder="Recherche..."
                    className="pl-8 bg-[#D7CAFC]  rounded-lg"
                />
            </div>
        </nav>
    );
}
