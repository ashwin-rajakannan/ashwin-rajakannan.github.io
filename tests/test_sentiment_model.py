import unittest
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../src')))
from sentiment_model import SentimentModel

class TestSentimentModel(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.model = SentimentModel()

    def test_positive(self):
        text = "I love this movie! It was fantastic."
        result = self.model.predict(text)
        self.assertEqual(result, 'pos')

    def test_negative(self):
        text = "This was a terrible film. I hated it."
        result = self.model.predict(text)
        self.assertEqual(result, 'neg')

if __name__ == '__main__':
    unittest.main()
