"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ArticleCard({ article, priority = false }) {
  const { title, source, publishedAt, description, url, urlToImage } = article;
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    // Check if this article is already bookmarked
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    setBookmarked(bookmarks.some((a) => a.url === url));
  }, [url]);

  const handleBookmark = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "[]");
    if (bookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter((a) => a.url !== url);
      localStorage.setItem("bookmarks", JSON.stringify(updated));
      setBookmarked(false);
    } else {
      // Add bookmark
      bookmarks.push({
        title,
        source,
        publishedAt,
        description,
        url,
        urlToImage,
      });
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
      setBookmarked(true);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="relative">
        {urlToImage ? (
          <Image
            src={urlToImage}
            alt={title || "News image"}
            width={400}
            height={200}
            className="w-full h-48 object-cover object-center"
            loading={priority ? "eager" : "lazy"}
            {...(priority ? { priority: true } : {})}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "";
            }}
          />
        ) : (
          <div className="w-full h-48 flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm16 10l-4-4a2 2 0 00-2.828 0l-4 4m0 0l-2-2m2 2l4-4a2 2 0 012.828 0l4 4"
              />
            </svg>
            <span className="text-xs">Image unavailable</span>
          </div>
        )}
        <button
          onClick={handleBookmark}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          className={`absolute top-3 right-3 bg-white/80 dark:bg-zinc-900/80 p-2 rounded-full shadow transition-colors ${
            bookmarked
              ? "text-blue-600 dark:text-blue-400"
              : "text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
          style={{ zIndex: 2 }}
        >
          <span className="sr-only">
            {bookmarked ? "Remove bookmark" : "Add bookmark"}
          </span>
          {bookmarked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-6 h-6"
            >
              <title>Click to remove bookmark</title>
              <path d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <title>Click to add bookmark</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3a2 2 0 00-2 2v12l7-4 7 4V5a2 2 0 00-2-2H5z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2 flex-1 dark:text-zinc-100">
            {title || "Untitled Article"}
          </h2>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-300 mb-2 flex gap-2 items-center">
          <span>{source?.name || "Unknown Source"}</span>
          <span>•</span>
          <span>
            {publishedAt
              ? new Date(publishedAt).toLocaleDateString()
              : "Unknown Date"}
          </span>
        </div>
        <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
          {description || "No description available."}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Read More
        </a>
      </div>
    </div>
  );
}
