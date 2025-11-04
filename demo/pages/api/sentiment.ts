import type { NextApiRequest, NextApiResponse } from 'next';
import vader from 'vader-sentiment';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { text } = req.body;
  if (!text || typeof text !== 'string') {
    res.status(400).json({ error: 'No text provided' });
    return;
  }
  try {
    const intensity = vader.SentimentIntensityAnalyzer.polarity_scores(text);
    const compound = intensity.compound;
    let sentiment: 'pos' | 'neg' | 'neu';
    if (compound >= 0.05) sentiment = 'pos';
    else if (compound <= -0.05) sentiment = 'neg';
    else sentiment = 'neu';
    res.status(200).json({ sentiment });
  } catch (error) {
    res.status(500).json({ error: 'Sentiment analysis failed' });
  }
}
