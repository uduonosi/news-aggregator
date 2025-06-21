"use client";

import ArticleGrid from "../ArticleGrid";
import { useState } from "react";
import { useMemoryLogger } from "../useMemoryLogger";
import { useWebVitalsLogger } from "../useWebVitalsLogger";
import AppHeader from "../AppHeader";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export default function SearchPage() {
  useMemoryLogger("Search Page Memory");
  useWebVitalsLogger();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("publishedAt");

  async function handleSearch(e) {
    e.preventDefault();
    if (!search.trim()) return;
    setLoading(true);
    setError(null);
    setArticles([]);
    setQuery(search);
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          search
        )}&sortBy=${sortBy}&pageSize=20&apiKey=${NEWS_API_KEY}`
      );
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setArticles(data.articles || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-8">
      <AppHeader />
      <form
        onSubmit={handleSearch}
        className="flex flex-col sm:flex-row gap-4 mb-8 items-stretch sm:items-end justify-center w-full max-w-2xl mx-auto"
      >
        <label className="flex flex-col flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 min-w-0">
          Search
          <input
            className="border rounded px-3 py-2 w-full mt-1 bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <label className="flex flex-col flex-1 text-sm font-medium text-zinc-700 dark:text-zinc-200 min-w-0">
          Sort by
          <select
            className="border rounded px-3 py-2 w-full mt-1 bg-white dark:bg-zinc-900 dark:text-zinc-100 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-0"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="publishedAt">Date</option>
            <option value="relevancy">Relevance</option>
            <option value="popularity">Popularity</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 font-medium hover:bg-blue-700 transition-colors sm:mt-[1.85rem] mt-0 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto"
          disabled={loading || !search.trim()}
        >
          Search
        </button>
      </form>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error}</div>}
      {!loading && !error && query && (
        <ArticleGrid
          articles={articles}
          titleClassName="text-lg font-semibold mb-2 line-clamp-2 dark:text-zinc-100"
        />
      )}
    </div>
  );
}
