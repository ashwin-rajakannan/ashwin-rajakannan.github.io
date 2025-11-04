"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";
import Link from "next/link";

export default function TextSummarizationDemo() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sample texts for quick demo
  const sampleTexts = [
    {
      title: "News Article",
      text: "Artificial intelligence (AI) is revolutionizing healthcare by enabling faster and more accurate diagnoses. Machine learning algorithms can analyze medical images, detect patterns in patient data, and predict disease outcomes with remarkable precision. Hospitals worldwide are adopting AI-powered tools to assist doctors in making informed decisions. Recent studies show that AI can identify certain cancers earlier than traditional methods, potentially saving countless lives. However, experts emphasize that AI should complement, not replace, human medical expertise. The integration of AI in healthcare also raises important questions about data privacy and ethical considerations that need to be carefully addressed."
    },
    {
      title: "Tech Update",
      text: "The latest advancements in natural language processing have enabled AI models to understand and generate human-like text with unprecedented accuracy. These models, trained on vast amounts of data, can perform tasks ranging from translation to content creation. Major tech companies are investing billions in AI research, leading to breakthrough innovations in various fields. The technology is being applied in customer service, education, and creative industries. While the potential benefits are enormous, researchers continue to work on addressing challenges related to bias, safety, and responsible AI development."
    }
  ];

  const handleSummarize = () => {
    if (!inputText.trim()) {
      alert("Please enter some text to summarize!");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call (since we don't have backend)
    setTimeout(() => {
      // Simple extractive summarization simulation
      const sentences = inputText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      const summaryLength = Math.min(3, Math.ceil(sentences.length / 3));
      const extractedSummary = sentences.slice(0, summaryLength).join('. ') + '.';
      
      setSummary(extractedSummary);
      setIsLoading(false);
    }, 1500);
  };

  const loadSample = (text: string) => {
    setInputText(text);
    setSummary("");
  };

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
              <Sparkles className="h-6 w-6 text-[#06B6D4]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Text Summarization Demo</h1>
              <p className="text-muted-foreground">Try out the AI-powered text summarization system</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              Interactive Demo
            </Badge>
            <Badge className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30">
              NLP
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
              <FileText className="h-5 w-5 text-[#06B6D4]" />
              About This Demo
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            <p>
              This is a <strong>simplified frontend demo</strong> of the Text Summarization System. 
              The full system uses advanced NLP techniques including BERT embeddings, transformer models, 
              and hybrid summarization approaches. For the complete implementation with backend API, 
              visit the{" "}
              <a 
                href="https://github.com/ashwin-rajakannan/text-summarization-system" 
                target="_blank"
                className="text-[#06B6D4] hover:underline font-medium"
              >
                  GitHub repository
              </a>.
            </p>
          </CardContent>
        </Card>

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
                {sample.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Demo Area */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Input Text</CardTitle>
              <CardDescription>Enter or paste the text you want to summarize</CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your text here..."
                className="w-full h-64 p-4 rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-[#06B6D4]/50"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {inputText.length} characters
                </span>
                <Button
                  onClick={handleSummarize}
                  disabled={isLoading || !inputText.trim()}
                  className="bg-[#06B6D4] hover:bg-[#06B6D4]/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                      Summarizing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Summarize
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Summary</CardTitle>
              <CardDescription>AI-generated summary of your text</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full h-64 p-4 rounded-md border bg-muted/30">
                {summary ? (
                  <p className="text-sm leading-relaxed">{summary}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    Your summary will appear here...
                  </p>
                )}
              </div>
              {summary && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {summary.length} characters (
                    {Math.round((summary.length / inputText.length) * 100)}% of original)
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setInputText("");
                      setSummary("");
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

        {/* Technical Details */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Technical Implementation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Full System Features:</h4>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Extractive Summarization:</strong> Uses BERT embeddings and cosine similarity for sentence ranking</li>
                <li><strong>Abstractive Summarization:</strong> Leverages transformer models (BART, T5) for generating summaries</li>
                <li><strong>Hybrid Approach:</strong> Combines both methods for optimal results</li>
                <li><strong>Evaluation Metrics:</strong> ROUGE scores for quality assessment</li>
                <li><strong>Preprocessing:</strong> Advanced text cleaning and normalization</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Transformers</Badge>
                <Badge variant="secondary">PyTorch</Badge>
                <Badge variant="secondary">NLTK</Badge>
                <Badge variant="secondary">scikit-learn</Badge>
                <Badge variant="secondary">BERT</Badge>
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
              <a href="https://github.com/ashwin-rajakannan/text-summarization-system" target="_blank">
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
