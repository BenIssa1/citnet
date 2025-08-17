import Timeline from "@/components/Timeline";
import SocialIcons from "@/components/ui/SocialIcons";
import { timelineData, socialIcons } from "../data/mockData";

export default function Sidebar() {
  return (
    <aside className="w-full lg:w-1/5 my-15 lg:my-0 lg:px-4 space-y-6">
      <div className="w-full lg:max-w-sm mx-auto">
        <Timeline items={timelineData} />

        <div className="mt-8">
          <h3 className="font-semibold mb-3">Suivez nous</h3>
          <SocialIcons icons={socialIcons} />
        </div>
      </div>
    </aside>
  );
} 