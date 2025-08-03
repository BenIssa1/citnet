import HomeSectionHeader from "@/components/HomeSectionHeader";
import PodcastCard from "@/components/PodcastCard";
import { podcasts } from "../data/mockData";

export default function PodcastSection() {
    return (
        <div className="my-10">
            <HomeSectionHeader
                title="Derniers Podcasts"
                onLinkClick={() => console.log('Voir plus cliqué')}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {podcasts.map((podcast, index) => (
                    <PodcastCard key={index} {...podcast} />
                ))}
            </div>
        </div>
    );
} 