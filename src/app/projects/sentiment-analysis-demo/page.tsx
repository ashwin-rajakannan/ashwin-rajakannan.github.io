"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";
import Link from "next/link";

export default function SentimentAnalysisDemo() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<{ sentiment: string; score: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sample texts for quick demo
  const sampleTexts = [
    {
      label: "Positive Review",
      text: "I absolutely love this product! It works great and exceeded my expectations."
    },
    {
      label: "Neutral Review",
      text: "Lionel Andrés 'Leo' Messi[note 1] (Spanish: [ljoˈnel anˈdɾes ˈmesi] ⓘ; born 24 June 1987) is an Argentine professional footballer who plays as a forward for and captains both Major League Soccer club Inter Miami and the Argentina national team."
    },
    {
      label: "Negative Review",
      text: "This was a terrible experience. The service was bad and I am very disappointed."
    }
  ];

  // Sentiment icons and scores
  const sentimentMeta = [
    { icon: "😡", label: "Negative", score: -1, color: "text-red-500" },
    { icon: "😐", label: "Neutral", score: 0, color: "text-yellow-500" },
    { icon: "😃", label: "Positive", score: 1, color: "text-green-500" }
  ];

  // Simple sentiment analysis (frontend only)
  const analyzeSentiment = () => {
    if (!inputText.trim()) {
      alert("Please enter some text to analyze!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      // Basic keyword-based sentiment analysis
      const positiveWords = ["good", "great", "excellent", "happy", "love", "awesome", "fantastic", "positive", "amazing", "wonderful"];
      const negativeWords = ["bad", "terrible", "sad", "hate", "awful", "poor", "negative", "horrible", "worst", "disappointing"];
      const text = inputText.toLowerCase();
      let score = 0;
      positiveWords.forEach(word => { if (text.includes(word)) score++; });
      negativeWords.forEach(word => { if (text.includes(word)) score--; });
      let sentiment = "Neutral";
      if (score > 0) sentiment = "Positive";
      else if (score < 0) sentiment = "Negative";
      setResult({ sentiment, score });
      setIsLoading(false);
    }, 1200);
  };

  const loadSample = (text: string) => {
    setInputText(text);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#06B6D4] transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20">
              <Sparkles className="h-6 w-6 text-[#06B6D4]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sentiment Analysis Demo</h1>
              <p className="text-muted-foreground">Try out the AI-powered sentiment analysis tool</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">Interactive Demo</Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">NLP</Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">Machine Learning</Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">Frontend-only</Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">JavaScript</Badge>
          </div>
        </div>
        <Separator className="mb-8" />
        <Card className="mb-6 border-[#06B6D4]/20 bg-[#06B6D4]/5">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#06B6D4]" />
              About This Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              This is a <strong>frontend demo</strong> of the Sentiment Analysis Tool. It uses basic keyword matching to determine if text is positive, negative, or neutral. For a full-featured version with advanced NLP, see the <a href="https://github.com/ashwin-rajakannan/sentiment-analysis-tool-v2" target="_blank" className="text-[#06B6D4] hover:underline font-medium">GitHub repository</a>.
            </p>
          </CardContent>
        </Card>
              <a href="https://github.com/ashwin-rajakannan" target="_blank" className="text-[#06B6D4] hover:underline font-medium">GitHub repository</a>.
        {/* Sample Texts */}
        <div className="mb-6">
          <h3 className="text-sm font-medium mb-3">Try a sample text:</h3>
          <div className="flex flex-wrap gap-2">
            {sampleTexts.map((sample, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => loadSample(sample.text)}
                className="text-[#06B6D4] border-[#06B6D4]/30 hover:bg-[#06B6D4]/10"
              >
                {sample.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sentiment Icons and Scores */}
        <div className="flex gap-8 justify-center mb-8">
          {sentimentMeta.map((meta) => (
            <div key={meta.label} className="flex flex-col items-center">
              <span className={`text-3xl ${meta.color}`}>{meta.icon}</span>
              <span className="text-xs font-semibold mt-1 text-muted-foreground">{meta.label}</span>
              <span className="text-xs font-mono mt-0.5 text-muted-foreground">{meta.score > 0 ? `+${meta.score}` : meta.score}</span>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Text</CardTitle>
              <CardDescription>Enter or paste the text you want to analyze</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                className="w-full h-64 p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{inputText.length} characters</span>
                <Button
                  onClick={analyzeSentiment}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Analyze Sentiment
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
              <CardDescription>Sentiment result from your text</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 p-4 rounded-md border bg-muted/30 flex flex-col items-center justify-center">
                {result ? (
                  <>
                    <span className={`text-5xl mb-2 ${result.sentiment === "Positive" ? "text-green-500" : result.sentiment === "Negative" ? "text-red-500" : "text-yellow-500"}`}>
                      {result.sentiment === "Positive" ? "😃" : result.sentiment === "Negative" ? "😡" : "😐"}
                    </span>
                    <span className="text-xl font-bold mb-1 text-white">{result.sentiment}</span>
                    <span className="text-sm font-mono text-muted-foreground">Score: {result.score > 0 ? `+${result.score}` : result.score}</span>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground italic">Your sentiment result will appear here...</p>
                )}
              </div>
              {result && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{inputText.length} characters analyzed</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputText("");
                      setResult(null);
                    }}
                    className="text-[#06B6D4] border-[#06B6D4]/30 hover:bg-[#06B6D4]/10"
                  >
                    Clear All
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Want to see the full implementation with production-ready code?</p>
          <div className="flex justify-center gap-4">
            <Button asChild className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white">
              <a href="https://github.com/ashwin-rajakannan/sentiment-analysis-tool-v2" target="_blank">View on GitHub</a>
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
