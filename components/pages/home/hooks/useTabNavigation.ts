import { useEffect, useRef, useState } from "react";

interface UseTabNavigationProps {
    tabs: string[];
    initialTab?: string;
}

export function useTabNavigation({ tabs, initialTab }: UseTabNavigationProps) {
    const [activeTab, setActiveTab] = useState(initialTab || tabs[0]);
    const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    useEffect(() => {
        const index = tabs.indexOf(activeTab);
        const currentTab = tabRefs.current[index];
        if (currentTab && containerRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const tabRect = currentTab.getBoundingClientRect();
            setUnderlineStyle({
                left: tabRect.left - containerRect.left,
                width: tabRect.width,
            });
        }
    }, [activeTab, tabs]);

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return {
        activeTab,
        underlineStyle,
        containerRef,
        tabRefs,
        handleTabClick,
    };
} 