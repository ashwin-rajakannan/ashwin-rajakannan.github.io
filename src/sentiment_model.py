import nltk
from nltk.sentiment import SentimentIntensityAnalyzer

class SentimentModel:
    def __init__(self):
        nltk.download('vader_lexicon', quiet=True)
        self.analyzer = SentimentIntensityAnalyzer()

    def predict(self, text: str) -> str:
        scores = self.analyzer.polarity_scores(text)
        compound = scores['compound']
        if compound >= 0.05:
            return 'pos'
        elif compound <= -0.05:
            from nltk.sentiment import SentimentIntensityAnalyzer
            import nltk

            class SentimentModel:
                def __init__(self):
                    nltk.download('vader_lexicon', quiet=True)
                    self.analyzer = SentimentIntensityAnalyzer()

                def predict(self, text):
                    scores = self.analyzer.polarity_scores(text)
                    compound = scores['compound']
                    if compound >= 0.05:
                        return 'pos'
                    elif compound <= -0.05:
                        return 'neg'
                    else:
                        return 'neu'
