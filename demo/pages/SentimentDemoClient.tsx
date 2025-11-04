"use client";
import { useState } from "react";
import Sentiment from "sentiment";
import Link from "next/link";

const sampleTexts = [
  {
    title: "Positive Review",
    text: "I absolutely loved this movie! The story was engaging and the acting was top-notch. Highly recommended."
  },
  {
    title: "Negative Review",
    text: "This was a terrible film. The plot made no sense and the characters were boring. I wouldn't watch it again."
  }
];

export default function SentimentDemoClient() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const sentiment = new Sentiment();

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setResult("");
    setTimeout(() => {
      const analysis = sentiment.analyze(input);
      let sentimentLabel = "Neutral";
      if (analysis.score > 0) sentimentLabel = "Positive";
      else if (analysis.score < 0) sentimentLabel = "Negative";
      setResult(`${sentimentLabel} (${analysis.score})`);
      setLoading(false);
    }, 800);
  };

  const loadSample = (text: string) => {
    setInput(text);
    setResult("");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-6xl py-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#06B6D4] transition-colors mb-6">
          <span className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Portfolio
          </span>
        </Link>

        <div className="space-y-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-[#06B6D4]/10 border border-[#06B6D4]/20">
              <svg className="h-6 w-6 text-[#06B6D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sentiment Analysis Demo</h1>
              <p className="text-muted-foreground">Try out the AI-powered sentiment analysis tool</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">Interactive Demo</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">NLP</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">Machine Learning</span>
          </div>
        </div>

        {/* About Section */}
        <div className="mb-8">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <h2 className="font-semibold mb-1 flex items-center gap-2">About This Demo</h2>
            <p className="text-slate-300 text-sm">
              This is a <span className="font-semibold text-white">simplified frontend demo</span> of the Sentiment Analysis Tool. The full system uses advanced NLP techniques for robust sentiment classification. For the complete implementation, see the GitHub repository.
            </p>
          </div>
        </div>

        {/* Sample Texts */}
        <div className="mb-4">
          <span className="font-semibold text-slate-200">Try a sample text:</span>
          <div className="flex gap-2 mt-2">
            {sampleTexts.map((s, i) => (
              <button
                key={i}
                type="button"
                className="bg-primary px-3 py-1 rounded text-white text-sm hover:bg-cyan-500"
                onClick={() => loadSample(s.text)}
              >
                {s.title}
              </button>
            ))}
          </div>
        </div>

        {/* Input/Output Cards */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-slate-900 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold mb-2">Input Text</h3>
            <textarea
              className="w-full min-h-[120px] bg-slate-800 rounded p-2 text-white border border-slate-700"
              placeholder="Paste your text here..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div className="text-xs text-slate-400 mt-1">{input.length} characters</div>
          </div>
          <div className="flex-1 bg-slate-900 rounded-lg p-4 border border-slate-700">
            <h3 className="font-semibold mb-2">Result</h3>
            <div className="min-h-[48px] flex items-center text-lg">
              {loading ? <span className="text-cyan-400">Analyzing...</span> : result ? <span className="text-cyan-400 font-bold">{result}</span> : <span className="text-slate-500">Your sentiment result will appear here...</span>}
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full md:w-auto bg-primary px-6 py-2 rounded font-semibold text-white hover:bg-cyan-500 transition mb-8"
          disabled={loading || !input.trim()}
        >
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {/* Technical Implementation */}
        <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
          <h2 className="font-semibold mb-2">Technical Implementation</h2>
          <div className="mb-2 text-sm text-slate-300">
            <ul className="list-disc ml-5">
              <li><span className="font-semibold text-white">Sentiment Analysis:</span> Uses the 'sentiment' JS library for robust sentiment scoring</li>
              <li><span className="font-semibold text-white">Frontend:</span> React + Tailwind CSS for interactive UI</li>
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">JavaScript</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">Sentiment</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">Next.js</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">React</span>
            <span className="bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 px-2 py-1 rounded text-xs font-semibold">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
