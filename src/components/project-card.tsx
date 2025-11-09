import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { cn } from "../lib/utils";
import Markdown from "react-markdown";

type ProjectCardProps = {
  title: string;
  description: string;
  image?: string;
  video?: string;
  tags?: string[];
  links?: { href: string; title: string; icon?: string }[];
  dates?: string;
  href?: string;
  isAIVoiceAssistant?: boolean;
  isTextSummarization?: boolean;
  isSentimentAnalysis?: boolean;
  isBookRecommender?: boolean;
  isTrafficSign?: boolean;
  isCtDNA?: boolean;
  isPaperOnly?: boolean;
  className?: string;
  expanded?: boolean;
  onExpand?: () => void;
  onCollapse?: () => void;
  showDemoModal?: boolean;
  onDemoModalOpen?: () => void;
  onDemoModalClose?: () => void;
};

const getShortDesc = (desc: string, wordLimit: number) => {
  if (!desc) return "";
  const words = desc.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : desc;
};

const ProjectCard = ({
  title,
  description,
  image,
  video,
  tags,
  links,
  dates,
  href,
  isAIVoiceAssistant,
  isTextSummarization,
  isSentimentAnalysis,
  isBookRecommender,
  isTrafficSign,
  isCtDNA,
  isPaperOnly,
  className,
  expanded = false,
  onExpand,
  onCollapse,
  showDemoModal = false,
  onDemoModalOpen,
  onDemoModalClose,
}: ProjectCardProps) => {
  const shortDesc = getShortDesc(description, 20);

  return (
    <>
      <Card
        className={cn(
          `flex flex-col overflow-hidden bg-slate-50 dark:bg-[#121417] border border-slate-200 dark:border-transparent hover:shadow-lg hover:shadow-[#06B6D4]/20 transition-all duration-300 ease-out justify-between ${expanded ? "" : "h-[520px]"} `,
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Row 1: Image/Video Section */}
          <div>
            {(video || image) && (
              (!isPaperOnly && !isTrafficSign && !isCtDNA) ? (
                (isAIVoiceAssistant || isTextSummarization || isSentimentAnalysis || isBookRecommender) ? (
                  <button
                    type="button"
                    className="block w-full cursor-pointer focus:outline-none"
                    onClick={() => onDemoModalOpen?.()}
                    aria-label="Try the Demo"
                  >
                    {video && (
                      <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="pointer-events-none mx-auto h-48 w-full object-cover object-top"
                      />
                    )}
                    {image && !video && (
                      <img src={image} alt={title} width={500} height={300} className="h-48 w-full overflow-hidden object-cover object-top" />
                    )}
                  </button>
                ) : (
                  <Link
                    href={href || "#"}
                    className="block cursor-pointer"
                  >
                    {video && (
                      <video
                        src={video}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="pointer-events-none mx-auto h-48 w-full object-cover object-top"
                      />
                    )}
                    {image && !video && (
                      <img src={image} alt={title} width={500} height={300} className="h-48 w-full overflow-hidden object-cover object-top" />
                    )}
                  </Link>
                )
              ) : (
                <div className="block">
                  {video && (
                    <video
                      src={video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="pointer-events-none mx-auto h-48 w-full object-cover object-top"
                    />
                  )}
                  {image && !video && (
                    <img src={image} alt={title} width={500} height={300} className="h-48 w-full overflow-hidden object-cover object-top" />
                  )}
                </div>
              )
            )}
          </div>
          {/* Row 2: Title & Date */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex flex-col">
              <span className="text-base font-semibold text-slate-900 dark:text-[#E5E7EB]">{title}</span>
              {dates && (
                <time className="font-sans text-xs text-slate-700 dark:text-[#E5E7EB]">{dates}</time>
              )}
            </div>
          </div>
          {/* Row 3: Description */}
          <div className="px-4 pb-2 flex flex-col items-stretch">
            <Markdown className="prose max-w-full text-pretty font-sans text-sm text-slate-700 dark:text-[#E5E7EB] dark:prose-invert">
              {shortDesc}
            </Markdown>
          </div>
          {/* Row 4: Arrow Toggle */}
          <div className="flex items-center justify-center pb-2" style={{ minHeight: "32px" }}>
            {tags && tags.length > 0 && (
              <button
                className="flex items-center justify-center text-[#06B6D4] hover:text-[#0891B2] transition-all"
                onClick={() => expanded ? onCollapse && onCollapse() : onExpand && onExpand()}
                aria-label={expanded ? "Collapse skills" : "Expand skills"}
                style={{ width: "32px", height: "32px" }}
              >
                <span className="sr-only">{expanded ? "Collapse" : "Expand"}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                >
                  <path d="M5 8l5 5 5-5" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
          {/* Row 5: Expandable Skill Badges */}
          {expanded && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 items-center justify-center animate-fadeIn">
              {tags && tags.length > 0 && tags.map((tag: string) => (
                tag === "Text Summarization System" ? null : (
                  <Badge
                    className="min-w-[80px] justify-center px-3 py-1 text-xs font-semibold bg-slate-100 dark:bg-[#1E293B] text-[#06B6D4] border border-[#06B6D4]/50 dark:border-[#06B6D4]/30 hover:bg-[#06B6D4]/10 text-center"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                )
              ))}
            </div>
          )}
          {/* Row 6: Action Buttons (always visible) */}
          <div className="px-4 pb-4 pt-2 flex items-center justify-center mt-auto">
            <div
              className={
                expanded
                  ? "flex flex-wrap gap-2 w-full justify-center items-center"
                  : "flex flex-wrap gap-2 w-full justify-center items-center min-h-[40px]"
              }
            >
              {links && links.length > 0 && links.map((link: { href: string; title: string; icon?: string }, idx: number) => (
                <Link
                  href={link?.href}
                  key={idx}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-[10px] font-medium rounded-md bg-transparent text-[#06B6D4] border border-[#06B6D4] hover:bg-[#06B6D4] hover:text-white transition-all duration-200 min-w-[90px] justify-center"
                >
                  <span>{link.title}</span>
                </Link>
              ))}
              {/* Add invisible placeholder for alignment if only one button */}
              {links && links.length === 1 && (
                <span className="inline-block px-3 py-2 min-w-[90px] opacity-0">&nbsp;</span>
              )}
            </div>
          </div>
        </div>
      </Card>
      {/* Modal for Try Demo - for AI Voice Assistant, Text Summarization, Sentiment Analysis, and Book Recommender */}
      {(isAIVoiceAssistant || isTextSummarization || isSentimentAnalysis || isBookRecommender) && showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm">
          <div className="relative w-80 h-80 flex flex-col justify-between bg-white dark:bg-[#121417] border-2 border-[#06B6D4] rounded-xl shadow-2xl p-6 animate-fadeIn">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-[#06B6D4] hover:text-gray-600 dark:hover:text-white text-lg font-bold w-6 h-6 flex items-center justify-center"
              onClick={() => onDemoModalClose?.()}
              aria-label="Close"
            >
              ×
            </button>
            {/* Content Container */}
            <div className="flex flex-col items-center justify-center flex-1 pt-4">
              {/* Icon */}
              <div className="mb-4 flex items-center justify-center">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#06B6D4]/10 border border-[#06B6D4]/30">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#06B6D4" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
                  </svg>
                </span>
              </div>
              {/* Title */}
              <h2 className="text-lg font-bold text-gray-900 dark:text-white text-center mb-3">Try the Demo! <span className="ml-1">✨</span></h2>
              {/* Description */}
              <div className="flex items-center justify-center mb-4">
                <p className="text-xs text-gray-600 dark:text-slate-300 text-center leading-relaxed">
                  {isAIVoiceAssistant
                    ? "Experience the AI-powered Voice Assistant in action. Convert speech to text, take voice notes, and manage tasks hands-free!"
                    : isTextSummarization
                    ? "Experience the AI-powered Text Summarization System in action. Paste your text and get instant summaries!"
                    : isBookRecommender
                    ? "Experience the AI-powered Book Recommendation System in action. Discover books based on genres and ratings!"
                    : "Experience the AI-powered Sentiment Analysis Tool in action. Paste your text and instantly see its sentiment!"}
                </p>
              </div>
            </div>
            {/* Buttons - Fixed at bottom */}
            <div className="flex gap-3 w-full justify-center">
              <a
                href={isAIVoiceAssistant ? "/projects/ai-voice-assistant-demo" : isTextSummarization ? "/projects/text-summarization-demo" : isBookRecommender ? "/projects/genre-based-book-recommender" : "/projects/sentiment-analysis-demo"}
                className="px-4 py-2 text-sm rounded-lg bg-[#06B6D4] text-white font-semibold shadow hover:bg-[#06B6D4]/90 transition-all"
                onClick={() => onDemoModalClose?.()}
              >
                Open Demo
              </a>
              <button
                className="px-4 py-2 text-sm rounded-lg border border-[#06B6D4] text-[#06B6D4] font-semibold bg-transparent hover:bg-[#06B6D4]/10 transition-all"
                onClick={() => onDemoModalClose?.()}
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { ProjectCard };
export default ProjectCard;