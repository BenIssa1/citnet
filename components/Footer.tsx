'use client';

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white px-6 md:px-12 py-12">
      {/* Haut : logo + colonnes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12">
        {/* Logo */}
        <div>
          <div className="flex items-center gap-2">
            <Image src="/logo-white.svg" alt="Citinet Logo" width={100} height={100} />
          </div>
        </div>

        {/* Catégories */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Catégories</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Social media</Link></li>
            <li><Link href="#">SEO</Link></li>
            <li className="flex items-center gap-2">
              <Link href="#">Contenu</Link>
              <span className="text-xs bg-white text-black px-2 py-0.5 rounded-full">New</span>
            </li>
            <li><Link href="#">Marketing digital</Link></li>
            <li><Link href="#">Technologie</Link></li>
            <li><Link href="#">IA</Link></li>
          </ul>
        </div>

        {/* Outils */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Outils</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Marketing digital</Link></li>
            <li><Link href="#">Cms</Link></li>
            <li><Link href="#">Productivité</Link></li>
            <li><Link href="#">Web analyse GA</Link></li>
            <li><Link href="#">No code</Link></li>
            <li><Link href="#">Design</Link></li>
            <li><Link href="#">IA</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Agences</Link></li>
            <li><Link href="#">Écoles</Link></li>
            <li><Link href="#">Événements</Link></li>
            <li><Link href="#">Ressources</Link></li>
            <li><Link href="#">Shops</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Bas : ligne + infos */}
      <div className="border-t border-gray-700 pt-6 text-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <p className="font-semibold mb-2">Informez-vous plus rapidement avec Citinet</p>
          <p className="text-gray-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>
        </div>
        <div className="text-gray-400">
          © 2077 Citinet. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
