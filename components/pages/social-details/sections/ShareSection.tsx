import ShareButtons from "./ShareButtons";

export default function ShareSection() {
    return (
        <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Partager avec vos proche
            </h2>
            <ShareButtons showCopyLink={true} />
        </div>
    );
} 