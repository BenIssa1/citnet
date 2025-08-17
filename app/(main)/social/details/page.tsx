import CommentForm from "@/components/CommentForm";
import CommentsSection from "@/components/CommentsSection";
import {
    ArticleHeader,
    ArticleHero,
    ArticleFooter,
    AuthorSection,
    ShareSection,
    RelatedArticles,
    Sidebar
} from "@/components/pages/social-details";

export default function SocialDetailsPage() {
    return (
        <div className="px-4 md:px-10 lg:px-20">
            <ArticleHeader />
            <ArticleHero />
            <ArticleFooter />

            <div className="flex flex-col xl:flex-row min-h-screen">
                <main className="flex-1">
                    <ShareSection />
                    <AuthorSection />
                    <CommentsSection />
                    <CommentForm />
                    <RelatedArticles />
                </main>

                <Sidebar />
            </div>
        </div>
    );
}