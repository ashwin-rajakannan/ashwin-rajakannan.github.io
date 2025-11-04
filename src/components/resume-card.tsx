"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly {
    readonly text: string;
    readonly href: string;
  }[];
  period: string;
  description?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    } else if (href && href !== "#") {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer"
      onClick={handleClick}
    >
      <Card className="flex border-transparent hover:border-[#06B6D4]/30 hover:shadow-md hover:shadow-[#06B6D4]/10 transition-all">
        <div className="flex-none">
          <Avatar className="!border-0 !outline-0 !ring-0 !bg-[#0B0C10] dark:!bg-[#0B0C10] size-12 m-auto">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain mix-blend-luminosity opacity-80 hover:opacity-100 transition-opacity grayscale-[30%] contrast-110"
            />
            <AvatarFallback>{altText ? altText[0] : ""}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 items-center flex-col group">
          <CardHeader>
            <div className="flex items-center justify-between gap-x-2 text-base">
              <h3 className="inline-flex items-center justify-center font-semibold leading-none text-xs sm:text-sm text-slate-900 dark:text-[#E5E7EB]">
                {title}
                {badges && (
                  <div className="flex gap-2 mt-2">
                    {badges.map((badge, index) => (
                      <a
                        href={badge.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.open(badge.href, '_blank');
                        }}
                        key={index}
                        className="no-underline"
                      >
                        <Badge
                          variant="outline"
                          className="cursor-pointer hover:bg-gradient-to-r hover:from-[#0E9F9F] hover:to-[#06B6D4] hover:text-white hover:border-[#0E9F9F] transition-colors"
                        >
                          {badge.text}
                        </Badge>
                      </a>
                    ))}
                  </div>
                )}
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    isExpanded ? "rotate-90" : "rotate-0"
                  )}
                />
              </h3>
              <div className="text-xs sm:text-sm tabular-nums text-slate-700 dark:text-[#E5E7EB] text-right">
                {period}
              </div>
            </div>
            {subtitle && <div className="font-sans text-xs text-slate-700 dark:text-[#E5E7EB]">{subtitle}</div>}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-2 text-xs sm:text-sm text-slate-700 dark:text-[#E5E7EB]"
            >
              {description}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
