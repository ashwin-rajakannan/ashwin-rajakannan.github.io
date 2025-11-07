
"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, BookOpen, Sparkles } from "lucide-react";
import Link from "next/link";
import BookRecommenderDemo from "./BookRecommenderDemo";

export default function GenreBasedBookRecommenderDemo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="container max-w-6xl py-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#06B6D4] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20">
              <BookOpen className="h-6 w-6 text-[#06B6D4]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Genre-Based Book Recommender Demo</h1>
              <p className="text-muted-foreground">Try out the AI-powered book recommendation system</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Interactive Demo
            </Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Collaborative Filtering
            </Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Machine Learning
            </Badge>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Demo Info */}
        <Card className="mb-6 border-[#06B6D4]/20 bg-[#06B6D4]/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#06B6D4]" />
              About This Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              This is a <strong>simplified frontend demo</strong> of the Genre-Based Book Recommendation System. 
              The full system uses collaborative filtering algorithms and genre-based analysis to recommend books 
              based on user preferences and ratings. For the complete implementation with backend API, 
              visit the{" "}
              <a 
                href="https://github.com/ashwin-rajakannan/genre-based-book-recommender" 
                target="_blank"
                className="text-[#06B6D4] hover:underline font-medium"
              >
                  GitHub repository
              </a>.
            </p>
          </CardContent>
        </Card>

        {/* Main Demo Area */}
        <BookRecommenderDemo />

        {/* Technical Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Full System Features:</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Collaborative Filtering:</strong> Uses user-item interaction patterns to find similar users and books</li>
                <li><strong>Genre-Based Analysis:</strong> Incorporates book genres to improve recommendation accuracy</li>
                <li><strong>Rating Prediction:</strong> Predicts user ratings for unseen books using machine learning</li>
                <li><strong>Hybrid Approach:</strong> Combines collaborative filtering with content-based methods</li>
                <li><strong>Data Processing:</strong> Advanced data cleaning and feature engineering</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Surprise</Badge>
                <Badge variant="secondary">scikit-learn</Badge>
                <Badge variant="secondary">Pandas</Badge>
                <Badge variant="secondary">NumPy</Badge>
                <Badge variant="secondary">Matplotlib</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Want to see the full implementation with production-ready code?
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
            >
              <a href="https://github.com/ashwin-rajakannan/genre-based-book-recommender" target="_blank">
                View on GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/#projects">Back to Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
