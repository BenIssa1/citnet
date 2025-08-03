'use client';

import Link from "next/link";
import Image from "next/image";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";

const links = [
    { name: "Catégories", href: "/social" },
    { name: "Outils", href: "/outils" },
    { name: "Agences", href: "/agences" },
    { name: "Écoles", href: "/ecoles" },
    { name: "Événements", href: "/evenements" },
    { name: "Ressources", href: "/ressources" },
    { name: "Livre Marketing", href: "/livre-marketing" },
    { name: "Jobs", href: "/jobs" },
    { name: "Contact", href: "/contact" },
];

const socialIconsMobile = [
    { href: "#", icon: "/icons/x-mobile.svg", alt: "Twitter" },
    { href: "#", icon: "/icons/linkedln-mobile.svg", alt: "LinkedIn" },
    { href: "#", icon: "/icons/facebook-mobile.svg", alt: "Facebook" },
    { href: "#", icon: "/icons/youtube-mobile.svg", alt: "YouTube" },
    { href: "#", icon: "/icons/instagram-mobile.svg", alt: "Instagram" },
    { href: "#", icon: "/icons/tiktok-mobile.svg", alt: "TikTok" },
];

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex w-full border-b bg-black px-20 py-6 items-center justify-between gap-6 text-sm font-medium">
                {/* Hamburger Menu Button */}
                <button onClick={toggleMobileMenu}>
                    <Image
                        src="/icons/hamburger.svg"
                        alt="Menu"
                        width={16}
                        height={16}
                        className="text-white"
                    />
                </button>

                {/* Desktop Links */}
                <div className="flex items-center gap-6 flex-wrap">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-white hover:text-blue-600 transition-colors"
                        >
                            {link.name}
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
                        className="pl-8 bg-[#D7CAFC] rounded-lg"
                    />
                </div>
            </nav>

            {/* Mobile Navigation */}
            <nav className="md:hidden w-full border-b  px-6 py-4 flex items-center justify-between">
                <Image
                    src="/logo.svg"
                    alt="Citinet Logo"
                    width={80}
                    height={40}
                    className="md:w-[100px] md:h-[50px]"
                />

                <button onClick={toggleMobileMenu}>
                    <Image
                        src="/icons/hamburger-black.svg"
                        alt="Menu"
                        width={16}
                        height={16}
                        className="text-white"
                    />
                </button>

            </nav>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-[#060033] bg-opacity-50"
                        onClick={toggleMobileMenu}
                    />

                    {/* Menu Content */}
                    <div className="absolute top-0 left-0 w-80 h-full bg-[#060033] text-white p-6 flex flex-col">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-2">
                                <Image src="/logo-white.svg" alt="Citnet Logo" width={80} height={40} />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={toggleMobileMenu}
                                className="text-gray-300 hover:text-white"
                            >
                                <span className="mr-2">X</span>
                                Fermer
                            </Button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex-1">
                            <ul className="space-y-4">
                                {links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-white hover:text-blue-300 transition-colors text-md font-medium block py-2"
                                            onClick={toggleMobileMenu}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Social Media Icons */}
                        <div className="mt-8">
                            <div className="flex gap-4 justify-start">
                                {socialIconsMobile.map(({ href, icon, alt }) => (
                                    <Link key={alt} href={href}>
                                        <Image
                                            src={icon}
                                            alt={alt}
                                            width={20}
                                            height={20}
                                            className="text-white hover:opacity-80 transition-opacity"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
