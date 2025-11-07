
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";
import DATA from "@/data/resume";
import BookRecommenderDemo from "./BookRecommenderDemo";

export default function Page() {
  const project = DATA.projects.find(p => p.title === "Genre-Based Book Recommender");
  return (
    <main className="prose mx-auto py-8 font-sans text-slate-700 dark:text-[#E5E7EB] dark:prose-invert">
      <Card className="max-w-2xl mx-auto shadow-lg border border-slate-200 dark:border-[#06B6D4]/20 bg-slate-50 dark:bg-[#121417]">
        <CardHeader>
          <CardTitle className="text-3xl font-bold tracking-tighter text-[#06B6D4] mb-2">{project?.title}</CardTitle>
          <div className="text-xs text-slate-700 dark:text-[#E5E7EB] mb-2">2025 &bull; Collaborative Filtering &bull; Python</div>
        </CardHeader>
        <CardContent>
          <img src={project?.image} alt={project?.title} width={500} height={300} className="h-48 w-full object-cover object-top rounded mb-4" />
          <Markdown className="prose max-w-full text-pretty font-sans text-base text-slate-700 dark:text-[#E5E7EB] dark:prose-invert mb-4">
            {project?.description || ""}
          </Markdown>
          <h2 className="text-xl font-semibold mt-6 mb-2">Features</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Collaborative filtering and genre-based recommendations</li>
            <li>Python implementation with Surprise and scikit-learn</li>
            <li>Easy-to-use demo and professional documentation</li>
            <li>Open-source: <a href="https://github.com/ashwin-rajakannan/genre-based-book-recommender" target="_blank" rel="noopener noreferrer" className="text-[#06B6D4] underline">GitHub Source</a></li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">Demo</h2>
          <BookRecommenderDemo />
          <h2 className="text-xl font-semibold mt-6 mb-2">Technologies Used</h2>
          <ul className="list-disc ml-6 mb-4">
            <li>Python</li>
            <li>Surprise</li>
            <li>scikit-learn</li>
            <li>Pandas, NumPy</li>
          </ul>
          <h2 className="text-xl font-semibold mt-6 mb-2">How it Works</h2>
          <p>The system uses collaborative filtering to recommend books based on user-item interactions and genre preferences. It is trained on a sample dataset and can be extended to larger datasets.</p>
        </CardContent>
        <CardFooter className="flex gap-4">
          {project?.links?.map((link, idx) => (
            <Link
              href={link.href}
              key={idx}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[10px] font-medium rounded-md bg-transparent text-[#06B6D4] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all duration-200 min-w-[90px] justify-center"
            >
              <span>{link.icon}</span>
              <span>{link.title}</span>
            </Link>
          ))}
        </CardFooter>
      </Card>
    </main>
  );
}
