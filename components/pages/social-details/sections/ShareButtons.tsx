import { Button } from "@/components/ui/button";
import Image from "next/image";
import { shareButtons } from "../data/mockData";

interface ShareButtonsProps {
    showCopyLink?: boolean;
    className?: string;
}

export default function ShareButtons({ showCopyLink = true, className = "" }: ShareButtonsProps) {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {showCopyLink && (
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 p-5 hover:bg-gray-50 transition-colors"
                >
                    <Image
                        src="/icons/link-angled.svg"
                        alt="Link"
                        width={16}
                        height={16}
                    />
                    Copier le lien
                </Button>
            )}

            <div className="flex gap-2">
                {shareButtons.map((button, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-10 h-10.5 p-0 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                    >
                        <Image
                            src={button.icon}
                            alt={button.alt}
                            width={16}
                            height={16}
                        />
                    </Button>
                ))}
            </div>
        </div>
    );
} 