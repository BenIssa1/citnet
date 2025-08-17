'use client';
import clsx from "clsx";
import { useTabNavigation } from "../hooks/useTabNavigation";

interface TabSectionProps {
    title: string;
    tabs: string[];
    children: React.ReactNode;
    onTabChange?: (tab: string) => void;
}

export default function TabSection({ title, tabs, children, onTabChange }: TabSectionProps) {
    const { activeTab, underlineStyle, containerRef, tabRefs, handleTabClick } = useTabNavigation({ tabs });

    const onTabClick = (tab: string) => {
        handleTabClick(tab);
        onTabChange?.(tab);
    };

    return (
        <div className="my-10">
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <div className="border-b border-gray-200">
                <div ref={containerRef} className="relative">
                    <nav className="flex space-x-6">
                        {tabs.map((tab, idx) => (
                            <button
                                key={tab}
                                ref={(el: HTMLButtonElement | null) => {
                                    tabRefs.current[idx] = el;
                                }}
                                onClick={() => onTabClick(tab)}
                                className={clsx(
                                    'pb-2 text-sm transition-colors',
                                    activeTab === tab
                                        ? 'text-black font-semibold'
                                        : 'text-gray-500 hover:text-black'
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                    {/* Barre rose animée */}
                    <span
                        className="absolute bottom-0 h-1 bg-pink-500 transition-all duration-300"
                        style={{
                            left: underlineStyle.left,
                            width: underlineStyle.width,
                        }}
                    />
                </div>
            </div>
            {children}
        </div>
    );
} 