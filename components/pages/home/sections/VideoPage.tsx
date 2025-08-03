import React, { useState } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { videoData, videoList } from "../data/mockData";

interface Video {
    id: string;
    title: string;
    duration: string;
    thumbnail: string;
}

export default function VideoPage() {
    const [currentVideo, setCurrentVideo] = useState<Video>(videoData);

    return (
        <div className="min-h-screen bg-video-bg text-video-text bg-[#181C23] my-10">
            <div className="w-full mx-auto px-4 lg:px-20 py-14">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main video section */}
                    <div className="lg:col-span-2">
                        {/* Video player */}
                        <div className="relative overflow-hidden">
                            <img
                                src={currentVideo.thumbnail}
                                alt="Main video"
                                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                            />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                <button className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-1 flex flex-col items-center justify-center">
                        <div className="bg-video-card rounded-2xl p-6 sticky top-8">
                            <h2 className="text-2xl font-bold text-[#FB87B2] mb-4">
                                Migrating to Linear
                            </h2>
                            <p className="text-white/80 leading-relaxed">
                                Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between bg-[#12141b] p-6">
                    <div className="flex items-center space-x-4">
                        <button >
                            <Play className="w-10 h-10 text-white" fill="currentColor" />
                        </button>
                        <div>
                            <p className="text-lg text-white">Émissions tendances</p>
                            <p className="text-sm text-white/60">{currentVideo.duration}</p>
                        </div>
                    </div>
                    <button className="flex items-center space-x-2 text-white hover:text-white transition-colors">
                        <ArrowUpRight className="w-6 h-6" />
                        <span className="text-md font-bold">Voir plus</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <div className="flex gap-4 min-w-full">
                        {videoList.map((video, index) => (
                            <div
                                key={video.id}
                                className="group cursor-pointer min-w-[200px] flex-shrink-0"
                                onClick={() => setCurrentVideo(video)}
                            >
                                <p className="text-lg font-bold text-white my-5">{index + 1}</p>
                                <div className="relative rounded-xl overflow-hidden mb-3">
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm text-white group-hover:text-white/80 transition-colors">
                                        {video.title}
                                    </h3>
                                    <p className="text-xs text-white/60">{video.duration}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
} 