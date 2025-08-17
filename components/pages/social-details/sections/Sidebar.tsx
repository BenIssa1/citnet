import PostItem from "@/components/PostItem";
import Image from "next/image";
import { popularPosts, socialIcons } from "../data/mockData";

export default function Sidebar() {
    return (
        <aside className="w-full lg:w-3/5 mt-10 xl:mt-0 xl:w-2/8 space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Populaire dans la catégories</h2>
            {popularPosts.map((post) => (
                <PostItem key={post.id} imageSrc={post.imageSrc} />
            ))}

            <div className="mt-8">
                <h3 className="font-semibold mb-3">Suivez nous</h3>
                <div className="flex gap-6 text-gray-500 text-xl">
                    {socialIcons.map((social, index) => (
                        <Image 
                            key={index}
                            src={social.icon} 
                            alt={social.alt} 
                            width={20} 
                            height={20} 
                        />
                    ))}
                </div>
            </div>
        </aside>
    );
} 