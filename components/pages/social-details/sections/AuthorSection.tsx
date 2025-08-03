import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { articleDetails } from "../data/mockData";

export default function AuthorSection() {
    return (
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 pr-8 py-10">
            <Avatar className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 mx-auto sm:mx-0">
                <AvatarImage src={articleDetails.author.avatar} alt={articleDetails.author.name} />
                <AvatarFallback className="bg-yellow-400 text-black font-semibold text-lg sm:text-xl">
                    {articleDetails.author.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                    <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{articleDetails.author.name}</h3>
                        <p className="text-sm sm:text-base text-gray-600">{articleDetails.author.role}</p>
                    </div>

                    <div className="flex justify-center sm:justify-end gap-2">
                        <Button
                            variant="link"
                            size="sm"
                            className="w-8 h-8 sm:w-10 sm:h-10 p-0"
                        >
                            <Image
                                src="/icons/x-blue.svg"
                                alt="X"
                                width={16}
                                height={16}
                            />
                        </Button>

                        <Button
                            variant="link"
                            size="sm"
                            className="w-8 h-8 sm:w-10 sm:h-10 p-0"
                        >
                            <Image
                                src="/icons/facebook-blue.svg"
                                alt="Facebook"
                                width={16}
                                height={16}
                            />
                        </Button>

                        <Button
                            variant="link"
                            size="sm"
                            className="w-8 h-8 sm:w-10 sm:h-10 p-0"
                        >
                            <Image
                                src="/icons/linkedln-blue.svg"
                                alt="LinkedIn"
                                width={16}
                                height={16}
                            />
                        </Button>
                    </div>
                </div>

                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {articleDetails.author.bio}
                </p>
            </div>
        </div>
    );
} 