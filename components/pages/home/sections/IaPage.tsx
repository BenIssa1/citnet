import React from 'react';
import { iaMainArticles, iaSidebarArticles } from "../data/mockData";

interface Article {
  id: string;
  title: string;
  description: string;
  author: string;
  date: string;
  image: string;
  category: string;
}

interface SidebarArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  timeAgo: string;
}

export default function IaPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Hero article */}
            <div className="relative mb-12 overflow-hidden">
              <img 
                src={'/images/bg-ia.jpg'} 
                alt="Hero article"
                className="w-full max-h-[550px] object-cover"
              />
            </div>

            {/* Articles grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {iaMainArticles.map((article) => (
                <article key={article.id} className="bg-blog-card rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3 text-sm text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3">
                      {article.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#181C23] rounded-tr-4xl p-6 text-white sticky top-8">
              <h3 className="text-lg font-semibold mb-6">Articles récents</h3>
              <div className="space-y-4">
                {iaSidebarArticles.map((article) => (
                  <div key={article.id} className="border-b border-white/10 pb-4 last:border-b-0">
                    <div className="flex items-center justify-start gap-2 mb-2">
                      <span className="text-xs text-white/60 font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-white/60">
                        {article.timeAgo}
                      </span>
                    </div>
                    <h4 className="font-medium mb-2 text-sm">
                      {article.title}
                    </h4>
                    <p className="text-xs text-white/80 line-clamp-2">
                      {article.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 