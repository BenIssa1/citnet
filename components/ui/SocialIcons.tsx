import Image from "next/image";

interface SocialIcon {
  href: string;
  icon: string;
  alt: string;
}

interface SocialIconsProps {
  icons: SocialIcon[];
  className?: string;
}

export default function SocialIcons({ icons, className = "" }: SocialIconsProps) {
  return (
    <div className={`flex justify-between gap-4 text-gray-500 text-xl ${className}`}>
      {icons.map((social, index) => (
        <Image 
          key={index}
          src={social.icon} 
          alt={social.alt} 
          width={15} 
          height={15} 
        />
      ))}
    </div>
  );
} 