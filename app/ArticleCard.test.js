import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ArticleCard from "./ArticleCard";

// Mock next/image to render a simple img
jest.mock("next/image", () => (props) => {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />;
});

// Mock localStorage
defineGlobalProperty("localStorage", {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
});

function defineGlobalProperty(key, value) {
  Object.defineProperty(global, key, {
    value,
    writable: true,
    configurable: true,
  });
}

describe("ArticleCard", () => {
  const article = {
    title: "Test Title",
    source: { name: "Test Source" },
    publishedAt: "2023-01-01T00:00:00Z",
    description: "Test description",
    url: "https://example.com",
    urlToImage: "https://example.com/image.jpg",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all article fields", () => {
    render(<ArticleCard article={article} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Source")).toBeInTheDocument();
    expect(screen.getByText("1/1/2023")).toBeInTheDocument();
    expect(screen.getByText("Test description")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", article.urlToImage);
    expect(screen.getByRole("link", { name: /read more/i })).toHaveAttribute(
      "href",
      article.url
    );
  });

  it("renders fallback for missing image", () => {
    render(<ArticleCard article={{ ...article, urlToImage: null }} />);
    expect(screen.getByText(/image unavailable/i)).toBeInTheDocument();
  });

  it("renders fallback for missing title, description, source, and date", () => {
    render(<ArticleCard article={{ url: "x" }} />);
    expect(screen.getByText("Untitled Article")).toBeInTheDocument();
    expect(screen.getByText("No description available.")).toBeInTheDocument();
    expect(screen.getByText("Unknown Source")).toBeInTheDocument();
    expect(screen.getByText("Unknown Date")).toBeInTheDocument();
  });

  it("toggles bookmark state and updates localStorage", () => {
    const getItem = jest.fn(() => "[]");
    const setItem = jest.fn();
    defineGlobalProperty("localStorage", { getItem, setItem });
    render(<ArticleCard article={article} />);
    const btn = screen.getByRole("button");
    fireEvent.click(btn);
    expect(setItem).toHaveBeenCalled();
    fireEvent.click(btn);
    expect(setItem).toHaveBeenCalledTimes(2);
  });
});
