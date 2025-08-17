import Image from "next/image";
import { heroData } from "../data/mockData";
import Tag from "@/components/ui/Tag";

export default function HeroSection() {
    const getTagVariant = (tag: string) => {
        switch (tag.toLowerCase()) {
            case 'design':
                return 'design';
            case 'research':
                return 'research';
            case 'presentation':
                return 'presentation';
            default:
                return 'design';
        }
    };

    return (
        <div className="px-4 lg:px-20">
            <div className="flex flex-col lg:flex-row bg-black text-white my-10">
                {/* LEFT SIDE */}
                <div className="w-full lg:w-1/2 p-4 mdp-10 flex flex-col justify-center">
                    <p className="text-green-400 font-semibold mb-2">{heroData.badge}</p>
                    <h1 className="text-pink-500 text-2xl md:text-5xl font-extrabold leading-tight mb-6">
                        {heroData.title}
                    </h1>
                    <p className="text-lg text-gray-200 mb-6">
                        {heroData.description}
                    </p>
                    <div className="flex gap-4 flex-wrap">
                        {heroData.tags.map((tag, index) => (
                            <Tag key={index} variant={getTagVariant(tag)}>
                                {tag}
                            </Tag>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full lg:w-1/2">
                    <Image
                        src={heroData.image}
                        alt="People smiling at laptop"
                        width={700}
                        height={500}
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
} 