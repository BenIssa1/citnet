'use client';

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function HeroArticleCard() {
    return (
        <div className="flex flex-col md:flex-row bg-white  overflow-hidden w-full mx-auto my-10">
            {/* Image */}
            <div className="md:w-2/3">
                <img
                    src="/images/hero.png"
                    alt="Hero"
                    className="w-full max-h-[600px] rounded-lg"
                />
            </div>

            {/* Content */}
            <div className="md:w-1/3 px-6 space-y-4">
                <div className="flex items-center space-x-2 bg-[#FAC5AB] w-fit p-1 px-2 rounded-full">
                    <Badge variant="outline" className="text-xs font-bold bg-white rounded-full">Facebook</Badge>
                    <span className="text-xs text-[#731521]">8 min lecture</span>
                </div>

                <h2 className="text-xl md:text-2xl font-bold text-blue-900 leading-tight">
                    UX review presentation
                </h2>

                <p className="text-sm text-gray-600">
                    How do you create compelling presentations that wow colleagues and impress managers?
                </p>

                <div className="flex items-center space-x-2 pt-2">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src="https://randomuser.me/api/portraits/women/68.jpg" />
                        <AvatarFallback>OR</AvatarFallback>
                    </Avatar>
                    <p className="text-sm text-gray-600 flex flex-col">
                        <span className="font-bold text-black">Olivia Rhye</span>
                        <span>20 Jan 2022</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
