Three NLP Projects Every ML Engineer Should Build

A practical guide to text summarization, chatbots, and machine translation

Want to break into NLP or level up your machine learning skills? Build these three projects. They cover the core techniques every NLP engineer needs to know, and they're practical enough to put on your resume or portfolio.

I've built all three in production environments. This guide distills what I learned into actionable steps you can follow, complete with code, resources, and common pitfalls to avoid.

---

Why These Three Projects?

Before diving in, let's talk about why these specific projects matter.

**Text Summarization** teaches you:
- Transformer architectures (BART, T5)
- Sequence-to-sequence modeling
- Handling long documents
- Balancing extractive vs abstractive approaches

**Chatbots** teach you:
- Dialog management and state handling
- Intent classification and NER
- Context management across turns
- Production deployment considerations

**Machine Translation** teaches you:
- Multilingual modeling
- Handling low-resource languages
- Cross-lingual transfer learning
- Domain adaptation

Together, these three projects give you hands-on experience with the most important NLP techniques and prepare you for real-world ML engineering work.

---

Project 1: Text Summarization System

Build a system that takes long documents and generates concise, accurate summaries.

What You'll Build

An API that accepts text input and returns summaries in three lengths (short, medium, long). The system should:
- Handle documents from 500 to 10,000 words
- Generate fluent, readable summaries
- Maintain factual accuracy
- Process requests in under 5 seconds

Technical Approach

You'll use a hybrid approach combining extractive and abstractive summarization.

**Step 1: Set Up Your Environment**

```python
# Install required packages
pip install transformers torch sentence-transformers flask

# Import libraries
from transformers import BartForConditionalGeneration, BartTokenizer
from sentence_transformers import SentenceTransformer
import numpy as np
from flask import Flask, request, jsonify
```

**Step 2: Build the Extractive Component**

Extractive summarization selects the most important sentences from the original text.

```python
class ExtractiveSummarizer:
    def __init__(self):
        # Use sentence transformers for embeddings
        self.encoder = SentenceTransformer('all-MiniLM-L6-v2')
    
    def extract_top_sentences(self, document, num_sentences=10):
        # Split document into sentences
        sentences = self.split_into_sentences(document)
        
        # Get embeddings for all sentences
        sentence_embeddings = self.encoder.encode(sentences)
        
        # Get document-level embedding
        doc_embedding = self.encoder.encode([document])[0]
        
        # Calculate similarity scores
        similarities = np.dot(sentence_embeddings, doc_embedding)
        
        # Get indices of top sentences
        top_indices = np.argsort(similarities)[-num_sentences:]
        
        # Return sentences in original order
        sorted_indices = sorted(top_indices)
        extracted_sentences = [sentences[i] for i in sorted_indices]
        
        return " ".join(extracted_sentences)
    
    def split_into_sentences(self, text):
        # Simple sentence splitting (use nltk for better results)
        import re
        sentences = re.split(r'(?<=[.!?])\s+', text)
        return [s.strip() for s in sentences if len(s.strip()) > 10]
```

**Step 3: Build the Abstractive Component**

Abstractive summarization generates new sentences using BART.

```python
class AbstractiveSummarizer:
    def __init__(self):
        self.model = BartForConditionalGeneration.from_pretrained(
            "facebook/bart-large-cnn"
        )
        self.tokenizer = BartTokenizer.from_pretrained(
            "facebook/bart-large-cnn"
        )
    
    def generate_summary(self, text, max_length=150, min_length=40):
        # Tokenize input
        inputs = self.tokenizer(
            text,
            max_length=1024,
            truncation=True,
            return_tensors="pt"
        )
        
        # Generate summary
        summary_ids = self.model.generate(
            inputs["input_ids"],
            max_length=max_length,
            min_length=min_length,
            length_penalty=2.0,
            num_beams=4,
            early_stopping=True
        )
        
        # Decode and return
        summary = self.tokenizer.decode(
            summary_ids[0],
            skip_special_tokens=True
        )
        
        return summary
```

**Step 4: Combine into Hybrid System**

```python
class HybridSummarizer:
    def __init__(self):
        self.extractive = ExtractiveSummarizer()
        self.abstractive = AbstractiveSummarizer()
    
    def summarize(self, document, length="medium"):
        # Define length parameters
        length_configs = {
            "short": {"sentences": 5, "max_len": 80},
            "medium": {"sentences": 10, "max_len": 150},
            "long": {"sentences": 15, "max_len": 250}
        }
        
        config = length_configs[length]
        
        # Step 1: Extract relevant sentences
        extracted_text = self.extractive.extract_top_sentences(
            document,
            num_sentences=config["sentences"]
        )
        
        # Step 2: Generate abstractive summary
        summary = self.abstractive.generate_summary(
            extracted_text,
            max_length=config["max_len"]
        )
        
        return summary
```

**Step 5: Build REST API**

```python
app = Flask(__name__)
summarizer = HybridSummarizer()

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    document = data.get('document', '')
    length = data.get('length', 'medium')
    
    if not document:
        return jsonify({"error": "No document provided"}), 400
    
    try:
        summary = summarizer.summarize(document, length)
        return jsonify({
            "summary": summary,
            "original_length": len(document.split()),
            "summary_length": len(summary.split())
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```

**Step 6: Test Your System**

```python
# Test with sample document
import requests

document = """
Artificial intelligence (AI) is transforming industries worldwide. 
Machine learning models can now perform tasks that once required human 
expertise. Natural language processing enables computers to understand 
and generate human language. Computer vision allows machines to interpret 
visual information. These technologies are being applied in healthcare, 
finance, transportation, and many other fields. However, challenges remain 
in areas like model interpretability, bias mitigation, and data privacy.
"""

response = requests.post(
    'http://localhost:5000/summarize',
    json={'document': document, 'length': 'short'}
)

print(response.json())
```

Common Pitfalls and Solutions

**Pitfall 1: Slow Performance**

Problem: Processing takes too long for long documents.

Solution:
- Truncate very long documents to 1024 tokens
- Use model quantization for faster inference
- Cache sentence embeddings
- Batch process multiple requests

**Pitfall 2: Poor Quality Summaries**

Problem: Summaries are incoherent or miss key points.

Solution:
- Fine-tune BART on domain-specific data
- Adjust num_beams parameter (higher = better quality, slower)
- Tune length_penalty to control summary length
- Use larger extractive window (more sentences)

**Pitfall 3: Factual Errors**

Problem: Generated summaries contain false information.

Solution:
- Use extractive step to ground in source text
- Add factual consistency checking
- Lower temperature in generation
- Use constrained decoding

Resources and Next Steps

**Datasets for Training:**
- CNN/Daily Mail (news articles)
- XSum (extreme summarization)
- PubMed (scientific papers)
- arXiv (research papers)

**Model Alternatives:**
- T5 (Google) - More versatile but slower
- Pegasus (Google) - Better for news
- LED (Longformer) - Handles longer documents

**Improvements to Try:**
- Add domain-specific fine-tuning
- Implement multi-document summarization
- Add keyword extraction
- Build evaluation metrics (ROUGE, BLEU)

---

Project 2: Conversational AI Chatbot

Build an intelligent chatbot that can understand user intent, maintain context, and generate appropriate responses.

What You'll Build

A chatbot API that:
- Classifies user intent (question, greeting, complaint, request)
- Extracts entities (names, dates, locations)
- Maintains conversation context
- Generates contextually appropriate responses
- Handles multi-turn conversations

Technical Approach

You'll build a modular system with intent classification, entity extraction, and response generation.

**Step 1: Set Up Your Environment**

```python
pip install transformers torch flask redis nltk

import torch
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    pipeline
)
from flask import Flask, request, jsonify
import redis
import json
from datetime import datetime
```

**Step 2: Build Intent Classifier**

```python
class IntentClassifier:
    def __init__(self):
        model_name = "distilbert-base-uncased"
        self.tokenizer = AutoTokenizer.from_pretrained(model_name)
        self.model = AutoModelForSequenceClassification.from_pretrained(
            model_name,
            num_labels=5  # Number of intent classes
        )
        
        self.intent_labels = [
            "greeting",
            "question", 
            "complaint",
            "request",
            "farewell"
        ]
    
    def classify(self, text):
        inputs = self.tokenizer(
            text,
            return_tensors="pt",
            truncation=True,
            max_length=512
        )
        
        with torch.no_grad():
            outputs = self.model(**inputs)
            predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
            intent_id = torch.argmax(predictions).item()
            confidence = predictions[0][intent_id].item()
        
        return {
            "intent": self.intent_labels[intent_id],
            "confidence": confidence
        }
```

Note: For production, you'll need to fine-tune this model on your own intent data. The code above shows the structure.

**Step 3: Build Entity Extractor**

```python
class EntityExtractor:
    def __init__(self):
        self.ner_pipeline = pipeline(
            "ner",
            model="dslim/bert-base-NER",
            aggregation_strategy="simple"
        )
    
    def extract(self, text):
        entities = self.ner_pipeline(text)
        
        # Organize entities by type
        organized = {}
        for entity in entities:
            entity_type = entity['entity_group']
            entity_text = entity['word']
            
            if entity_type not in organized:
                organized[entity_type] = []
            organized[entity_type].append(entity_text)
        
        return organized
```

**Step 4: Build Context Manager**

```python
class ContextManager:
    def __init__(self, redis_client):
        self.redis = redis_client
        self.max_history = 5
        self.ttl = 1800  # 30 minutes
    
    def save_turn(self, session_id, user_message, bot_response):
        key = f"chat:{session_id}"
        
        # Get existing history
        history = self.get_history(session_id)
        
        # Add new turn
        history.append({
            "user": user_message,
            "bot": bot_response,
            "timestamp": datetime.now().isoformat()
        })
        
        # Keep only recent history
        if len(history) > self.max_history:
            history = history[-self.max_history:]
        
        # Save to Redis
        self.redis.setex(
            key,
            self.ttl,
            json.dumps(history)
        )
    
    def get_history(self, session_id):
        key = f"chat:{session_id}"
        data = self.redis.get(key)
        
        if data:
            return json.loads(data)
        return []
    
    def get_context_string(self, session_id, num_turns=3):
        history = self.get_history(session_id)
        recent = history[-num_turns:]
        
        context_parts = []
        for turn in recent:
            context_parts.append(f"User: {turn['user']}")
            context_parts.append(f"Bot: {turn['bot']}")
        
        return "\n".join(context_parts)
```

**Step 5: Build Response Generator**

```python
class ResponseGenerator:
    def __init__(self):
        # Template-based responses for common intents
        self.templates = {
            "greeting": [
                "Hello! How can I help you today?",
                "Hi there! What can I do for you?",
                "Welcome! How may I assist you?"
            ],
            "farewell": [
                "Goodbye! Have a great day!",
                "Thanks for chatting. Take care!",
                "See you later!"
            ]
        }
        
        # Generative model for complex responses
        self.generator = pipeline(
            "text-generation",
            model="microsoft/DialoGPT-medium"
        )
    
    def generate(self, intent, user_message, context=""):
        # Use templates for simple intents
        if intent in self.templates:
            import random
            return random.choice(self.templates[intent])
        
        # Use generative model for complex intents
        prompt = f"{context}\nUser: {user_message}\nBot:"
        
        response = self.generator(
            prompt,
            max_length=100,
            num_return_sequences=1,
            pad_token_id=50256
        )
        
        # Extract just the bot's response
        full_text = response[0]['generated_text']
        bot_response = full_text.split("Bot:")[-1].strip()
        
        return bot_response
```

**Step 6: Integrate Everything**

```python
class Chatbot:
    def __init__(self):
        self.intent_classifier = IntentClassifier()
        self.entity_extractor = EntityExtractor()
        self.response_generator = ResponseGenerator()
        
        # Redis for context storage
        self.redis_client = redis.Redis(
            host='localhost',
            port=6379,
            db=0,
            decode_responses=True
        )
        self.context_manager = ContextManager(self.redis_client)
    
    def process_message(self, session_id, user_message):
        # Step 1: Classify intent
        intent_result = self.intent_classifier.classify(user_message)
        intent = intent_result["intent"]
        
        # Step 2: Extract entities
        entities = self.entity_extractor.extract(user_message)
        
        # Step 3: Get conversation context
        context = self.context_manager.get_context_string(session_id)
        
        # Step 4: Generate response
        response = self.response_generator.generate(
            intent,
            user_message,
            context
        )
        
        # Step 5: Save to context
        self.context_manager.save_turn(
            session_id,
            user_message,
            response
        )
        
        return {
            "response": response,
            "intent": intent,
            "confidence": intent_result["confidence"],
            "entities": entities
        }
```

**Step 7: Build API**

```python
app = Flask(__name__)
chatbot = Chatbot()

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    session_id = data.get('session_id', 'default')
    message = data.get('message', '')
    
    if not message:
        return jsonify({"error": "No message provided"}), 400
    
    try:
        result = chatbot.process_message(session_id, message)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
```

**Step 8: Test Your Chatbot**

```python
import requests
import uuid

session_id = str(uuid.uuid4())

messages = [
    "Hello!",
    "I need help with my order",
    "My order number is 12345",
    "Thanks for your help"
]

for message in messages:
    response = requests.post(
        'http://localhost:5001/chat',
        json={'session_id': session_id, 'message': message}
    )
    print(f"User: {message}")
    print(f"Bot: {response.json()['response']}\n")
```

Common Pitfalls and Solutions

**Pitfall 1: Lost Context**

Problem: Bot forgets previous messages.

Solution:
- Use Redis or database for persistent storage
- Pass conversation history to response generator
- Implement session timeout (30 minutes)

**Pitfall 2: Generic Responses**

Problem: Bot gives vague, unhelpful answers.

Solution:
- Fine-tune on domain-specific conversations
- Use templates for common scenarios
- Implement knowledge base lookup
- Add entity-aware response generation

**Pitfall 3: Slow Response Time**

Problem: Users wait too long for replies.

Solution:
- Use smaller models (DistilBERT vs BERT)
- Cache common responses
- Use async processing
- Implement timeouts and fallbacks

Resources and Next Steps

**Datasets for Training:**
- Ubuntu Dialog Corpus
- Cornell Movie Dialogs
- MultiWOZ (task-oriented dialogs)
- Your own customer service logs

**Model Alternatives:**
- Rasa (open-source chatbot framework)
- Blenderbot (Facebook)
- LaMDA-style models
- GPT-3/4 via API

**Improvements to Try:**
- Add sentiment analysis
- Implement slot filling for forms
- Add multi-language support
- Build admin dashboard for monitoring

---

Project 3: Multi-Language Translation System

Build a translation system supporting multiple languages with domain adaptation.

What You'll Build

A translation API that:
- Translates between 10+ languages
- Supports custom domains (legal, medical, casual)
- Handles batch translation
- Auto-detects source language
- Maintains formatting

Technical Approach

You'll use mT5 (multilingual T5) with optional fine-tuning for specific domains.

**Step 1: Set Up Your Environment**

```python
pip install transformers torch langdetect flask

from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import torch
from langdetect import detect
from flask import Flask, request, jsonify
```

**Step 2: Build Base Translator**

```python
class BaseTranslator:
    def __init__(self):
        model_name = "google/mt5-base"
        self.model = MT5ForConditionalGeneration.from_pretrained(model_name)
        self.tokenizer = MT5Tokenizer.from_pretrained(model_name)
        
        self.supported_languages = {
            "en": "English",
            "es": "Spanish",
            "fr": "French",
            "de": "German",
            "zh": "Chinese",
            "ja": "Japanese",
            "ko": "Korean",
            "ar": "Arabic",
            "hi": "Hindi",
            "pt": "Portuguese"
        }
    
    def translate(self, text, source_lang, target_lang):
        # Validate languages
        if source_lang not in self.supported_languages:
            raise ValueError(f"Unsupported source language: {source_lang}")
        if target_lang not in self.supported_languages:
            raise ValueError(f"Unsupported target language: {target_lang}")
        
        # Prepare input
        input_text = f"translate {source_lang} to {target_lang}: {text}"
        
        # Tokenize
        inputs = self.tokenizer(
            input_text,
            return_tensors="pt",
            max_length=512,
            truncation=True
        )
        
        # Generate translation
        with torch.no_grad():
            outputs = self.model.generate(
                inputs["input_ids"],
                max_length=512,
                num_beams=4,
                length_penalty=0.6,
                early_stopping=True
            )
        
        # Decode
        translation = self.tokenizer.decode(
            outputs[0],
            skip_special_tokens=True
        )
        
        return translation
```

**Step 3: Add Language Detection**

```python
class LanguageDetector:
    def __init__(self):
        self.supported_langs = ["en", "es", "fr", "de", "zh", "ja", "ko", "ar", "hi", "pt"]
    
    def detect(self, text):
        try:
            detected = detect(text)
            if detected in self.supported_langs:
                return detected
            return "en"  # Default fallback
        except:
            return "en"
```

**Step 4: Build Smart Translator with Auto-Detection**

```python
class SmartTranslator:
    def __init__(self):
        self.base_translator = BaseTranslator()
        self.language_detector = LanguageDetector()
    
    def translate(self, text, target_lang, source_lang=None):
        # Auto-detect source language if not provided
        if source_lang is None:
            source_lang = self.language_detector.detect(text)
        
        # Skip translation if source and target are the same
        if source_lang == target_lang:
            return {
                "translation": text,
                "source_lang": source_lang,
                "target_lang": target_lang,
                "message": "Source and target languages are the same"
            }
        
        # Perform translation
        translation = self.base_translator.translate(
            text,
            source_lang,
            target_lang
        )
        
        return {
            "translation": translation,
            "source_lang": source_lang,
            "target_lang": target_lang
        }
```

**Step 5: Add Batch Translation**

```python
class BatchTranslator:
    def __init__(self):
        self.translator = SmartTranslator()
    
    def translate_batch(self, texts, target_lang, source_lang=None):
        results = []
        
        for text in texts:
            try:
                result = self.translator.translate(
                    text,
                    target_lang,
                    source_lang
                )
                results.append(result)
            except Exception as e:
                results.append({
                    "error": str(e),
                    "original_text": text
                })
        
        return results
```

**Step 6: Build Translation API**

```python
app = Flask(__name__)
translator = BatchTranslator()

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')
    target_lang = data.get('target_lang', 'en')
    source_lang = data.get('source_lang')  # Optional
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    try:
        result = translator.translator.translate(
            text,
            target_lang,
            source_lang
        )
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/translate/batch', methods=['POST'])
def translate_batch():
    data = request.json
    texts = data.get('texts', [])
    target_lang = data.get('target_lang', 'en')
    source_lang = data.get('source_lang')
    
    if not texts:
        return jsonify({"error": "No texts provided"}), 400
    
    try:
        results = translator.translate_batch(
            texts,
            target_lang,
            source_lang
        )
        return jsonify({"translations": results})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5002)
```

**Step 7: Test Your System**

```python
import requests

# Single translation
response = requests.post(
    'http://localhost:5002/translate',
    json={
        'text': 'Hello, how are you?',
        'target_lang': 'es'
    }
)
print("Single:", response.json())

# Batch translation
response = requests.post(
    'http://localhost:5002/translate/batch',
    json={
        'texts': [
            'Good morning',
            'Thank you',
            'See you later'
        ],
        'target_lang': 'fr'
    }
)
print("Batch:", response.json())
```

Common Pitfalls and Solutions

**Pitfall 1: Poor Quality for Low-Resource Languages**

Problem: Translations to/from Hindi, Arabic are poor.

Solution:
- Fine-tune on domain-specific parallel data
- Use back-translation for data augmentation
- Consider specialized models for specific language pairs

**Pitfall 2: Lost Formatting**

Problem: HTML, markdown, or special characters get mangled.

Solution:
- Extract and preserve special tokens before translation
- Re-insert tokens after translation
- Use regex to protect URLs, emails, code snippets

**Pitfall 3: Context Loss**

Problem: Pronouns and references get translated incorrectly.

Solution:
- Implement document-level translation
- Pass previous sentences as context
- Use coreference resolution

Resources and Next Steps

**Datasets for Training:**
- OPUS (parallel corpus for 100+ languages)
- WMT translation tasks
- Tatoeba (sentence pairs)
- CCMatrix (large-scale parallel corpus)

**Model Alternatives:**
- M2M-100 (Facebook, many-to-many)
- MarianMT (fast, language-pair specific)
- NLLB (No Language Left Behind)

**Improvements to Try:**
- Domain-specific fine-tuning
- Quality estimation scores
- Confidence scoring
- Post-editing suggestions

---

Putting It All Together

Now that you've built all three projects, here's how to level them up:

**1. Deploy to Production**

Use Docker to containerize your services:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
```

**2. Add Monitoring**

Track key metrics:
- Request latency
- Error rates
- Model confidence scores
- Usage patterns

**3. Implement Caching**

Use Redis to cache:
- Common translations
- Summary results
- Chatbot responses

**4. Build a Demo UI**

Create a simple web interface using HTML/JavaScript or Streamlit.

**5. Add Tests**

Write unit tests for each component:

```python
import pytest

def test_summarization():
    summarizer = HybridSummarizer()
    text = "This is a test document. It has multiple sentences."
    summary = summarizer.summarize(text, "short")
    assert len(summary) > 0
    assert len(summary) < len(text)
```

---

Final Thoughts

These three projects form a solid foundation for NLP engineering. They cover the essential techniques and give you practical experience with production ML systems.

But building them is just the start. The real learning happens when you:
- Fine-tune models on your own data
- Optimize for speed and accuracy
- Handle edge cases and errors
- Deploy to production and monitor performance

Start with one project. Build it completely. Deploy it. Then move to the next.

Your portfolio will be stronger with one production-quality project than with three half-finished experiments.

---

Let's Connect!

Built these projects? Found better approaches? I'd love to see what you created.

**Email:** aswinraja98@gmail.com  
**LinkedIn:** linkedin.com/in/ashwin-rajakannan-094876189  
**GitHub:** github.com/ashwin-rajakannan  
**Kaggle:** www.kaggle.com/ashwin0001

---

This is the fifth post in my ML journey series. Check out my previous posts:

- From Electronics to AI: My Journey as an ML Developer (https://medium.com/@aswinraja98/from-electronics-to-ai-my-journey-as-an-ml-developer-dc0afaa1ad49)
- Detecting Cancer Through DNA: Building a ctDNA Detection System (https://medium.com/@aswinraja98/detecting-cancer-through-dna-my-journey-building-a-ctdna-detection-system-with-machine-learning-d780424c2fa3)
- From Data Engineering to NLP: Lessons from My First Three Tech Roles (https://medium.com/@aswinraja98/from-data-engineering-to-nlp-lessons-from-my-first-three-tech-roles-8eea3ed32a10)
- Building Production NLP Systems: My Journey with Text Summarization, Chatbots, and Translation

Thanks for reading!

What projects should I cover next? Drop your suggestions below!

---

Tags: #MachineLearning #NLP #Tutorial #Python #Transformers #AI #ProjectGuide #DeepLearning #MLProjects #CareerDevelopment
