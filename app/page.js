"use client";

import ArticleGrid from "./ArticleGrid";
import { useEffect, useState } from "react";
import { useMemoryLogger } from "./useMemoryLogger";
import { useWebVitalsLogger } from "./useWebVitalsLogger";
import AppHeader from "./AppHeader";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const CATEGORIES = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

export default function Home() {
  useMemoryLogger("Home Page Memory");
  useWebVitalsLogger();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("general");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=20&page=${page}&apiKey=${NEWS_API_KEY}`
        );
        if (!res.ok) {
          let apiError = "";
          try {
            const errData = await res.json();
            apiError = errData.message ? `: ${errData.message}` : "";
          } catch {}
          throw new Error(`Failed to fetch news${apiError}`);
        }
        const data = await res.json();
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, [category, page]);

  function handleCategoryChange(cat) {
    setCategory(cat);
    setPage(1);
  }

  const totalPages = Math.ceil(totalResults / 24);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 p-4 sm:p-8">
      <AppHeader />
      <div className="flex flex-wrap gap-2 mb-8 items-center justify-center">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded font-medium transition-colors border focus:outline-none 
              ${
                category === cat
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700 active:bg-blue-800"
                  : "bg-white text-zinc-800 border-zinc-300 hover:bg-zinc-100 active:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:active:bg-zinc-950"
              }
            `}
            onClick={() => handleCategoryChange(cat)}
            type="button"
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>
      {loading && <div className="text-center">Loading...</div>}
      {error && (
        <div className="text-center text-red-500 max-w-lg mx-auto">{error}</div>
      )}
      {!loading && !error && (
        <ArticleGrid articles={articles} imagePriorityCount={4} />
      )}
      {!loading && !error && totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          <button
            className="px-3 py-1 rounded border disabled:opacity-50 flex items-center justify-center focus:outline-none hover:bg-zinc-100 active:bg-zinc-200 bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:active:bg-zinc-950"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <span className="px-3 py-1 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded border disabled:opacity-50 flex items-center justify-center focus:outline-none hover:bg-zinc-100 active:bg-zinc-200 bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:active:bg-zinc-950"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
