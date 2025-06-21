import React from "react";
import ArticleCard from "./ArticleCard";

export default function ArticleGrid({ articles, imagePriorityCount = 0 }) {
  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl">
        {articles.map((article, idx) => (
          <ArticleCard
            key={article.url || idx}
            article={article}
            priority={idx < imagePriorityCount}
          />
        ))}
      </div>
    </div>
  );
}
