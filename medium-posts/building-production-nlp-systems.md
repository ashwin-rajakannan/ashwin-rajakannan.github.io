Building Production NLP Systems: My Journey with Text Summarization, Chatbots, and Translation

From theory to production: Real lessons learned building three NLP applications

As an ML Engineer, the gap between training a model in a Jupyter notebook and shipping it to production can feel like a canyon. Over the past year, I've had the privilege of building three production NLP systems: a text summarization engine, an intelligent chatbot, and a multi-language translation system.

This is the story of how I went from reading papers to deploying models that handle thousands of requests daily. More importantly, it's about the lessons I learned when things broke, when models failed, and when reality hit my carefully crafted assumptions.

---

The Journey: Three Systems, Three Challenges

Between June 2023 and now, I've worked as an ML Engineer focused on Natural Language Processing. My work centered on three major projects:

**Project 1: Text Summarization Engine** (Jun 2023 - Sep 2023)  
**Project 2: Conversational AI Chatbot** (Sep 2023 - Jan 2024)  
**Project 3: Multi-language Translation System** (Jan 2024 - Present)

Each project taught me something different about production ML. Each had its own technical challenges, business constraints, and learning moments.

Let me walk you through them.

---

Project 1: Text Summarization Engine

The Challenge

Build a system that could take long documents (research papers, news articles, legal documents) and generate accurate, concise summaries. The system needed to:

- Handle documents of varying lengths (500 to 10,000 words)
- Generate summaries in multiple formats (bullet points, paragraphs, abstracts)
- Process documents in under 5 seconds
- Maintain factual accuracy (no hallucinations)
- Scale to handle 1000+ documents per day

The Technical Approach

I had two main options: extractive summarization (selecting important sentences) or abstractive summarization (generating new sentences). I chose a hybrid approach.

**Architecture:**

```python
from transformers import BartForConditionalGeneration, BartTokenizer
from sentence_transformers import SentenceTransformer
import numpy as np

class HybridSummarizer:
    def __init__(self):
        # Abstractive model for generation
        self.bart_model = BartForConditionalGeneration.from_pretrained("facebook/bart-large-cnn")
        self.bart_tokenizer = BartTokenizer.from_pretrained("facebook/bart-large-cnn")
        
        # Sentence embeddings for extractive ranking
        self.sentence_encoder = SentenceTransformer('all-MiniLM-L6-v2')
    
    def extractive_step(self, document, top_k=10):
        # Split into sentences
        sentences = self.split_sentences(document)
        
        # Encode sentences
        embeddings = self.sentence_encoder.encode(sentences)
        
        # Compute similarity to document embedding
        doc_embedding = self.sentence_encoder.encode([document])[0]
        similarities = np.dot(embeddings, doc_embedding)
        
        # Get top-k most relevant sentences
        top_indices = np.argsort(similarities)[-top_k:]
        extracted_text = " ".join([sentences[i] for i in sorted(top_indices)])
        
        return extracted_text
    
    def abstractive_step(self, extracted_text, max_length=150):
        # Generate summary from extracted content
        inputs = self.bart_tokenizer(extracted_text, 
                                     max_length=1024, 
                                     truncation=True, 
                                     return_tensors="pt")
        
        summary_ids = self.bart_model.generate(
            inputs["input_ids"],
            max_length=max_length,
            min_length=40,
            length_penalty=2.0,
            num_beams=4,
            early_stopping=True
        )
        
        summary = self.bart_tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary
    
    def summarize(self, document, summary_length="medium"):
        # Step 1: Extract relevant content
        extracted = self.extractive_step(document)
        
        # Step 2: Generate abstractive summary
        max_len = {"short": 80, "medium": 150, "long": 250}[summary_length]
        summary = self.abstractive_step(extracted, max_length=max_len)
        
        return summary
```

**Why This Approach?**

Extractive summarization alone is fast but produces choppy, disconnected summaries. Abstractive summarization alone can hallucinate facts or produce inconsistent output. The hybrid approach combines the best of both:

- Extractive step reduces input size and focuses on relevant content
- Abstractive step creates fluent, coherent summaries
- Together, they balance accuracy and readability

**Model Selection: BART vs T5**

I tested both BART (facebook/bart-large-cnn) and T5 (t5-base) for the abstractive step.

BART won because:
- Better at maintaining factual accuracy
- Faster inference time (1.2s vs 2.1s for T5)
- Pre-trained specifically on summarization tasks
- Better handling of long documents

**The Reality Check**

My initial implementation was too slow. Processing a 5000-word document took 12 seconds. Users wouldn't wait.

The problem: I was encoding every sentence individually and running the full BART model on large chunks.

**The Solution:**

1. Batch sentence encoding (5x speedup)
2. Smart truncation (only use first 1024 tokens for very long docs)
3. Model quantization using PyTorch's dynamic quantization (30% faster inference)
4. Caching sentence embeddings for repeated documents

Final result: 3.8 seconds average processing time.

**Production Challenges I Faced**

Challenge 1: Hallucinations

BART occasionally generated facts that weren't in the original document. Example:

Original: "The study included 500 participants"  
Summary: "The groundbreaking study of 5000 participants showed..."

**Solution:** I added a factual consistency check using a separate NLI (Natural Language Inference) model to verify summary claims against source text. Rejected summaries with low consistency scores.

Challenge 2: Domain-Specific Language

Legal documents and medical papers used jargon that BART wasn't trained on.

**Solution:** Fine-tuned BART on domain-specific datasets (1000 legal documents, 800 medical papers). Accuracy improved from 68% to 84% for specialized documents.

Challenge 3: Varying Summary Lengths

Business users wanted different summary lengths for different use cases.

**Solution:** Added three preset lengths (short/medium/long) and a custom length parameter. Implemented length penalties in beam search to control output size.

**Results and Impact**

After three months in production:

- Processed 47,000+ documents
- Average processing time: 3.8 seconds
- User satisfaction rating: 4.2/5
- Accuracy (human evaluation): 82%
- Reduced document review time by 65% for internal teams

**What I Learned**

1. Hybrid approaches often beat pure extractive or abstractive methods
2. Model selection depends on your specific constraints (speed vs accuracy vs domain)
3. Fine-tuning on domain data is not optional for specialized content
4. Users care more about speed and accuracy than model sophistication
5. Factual consistency matters more than perfect fluency

---

Project 2: Conversational AI Chatbot

The Challenge

Build an intelligent chatbot for customer service that could:

- Understand user intent across multiple domains
- Maintain conversation context across multiple turns
- Handle ambiguous queries gracefully
- Integrate with existing knowledge bases
- Respond in under 2 seconds
- Support 24/7 operation with minimal downtime

Unlike the summarization system, this required stateful conversation management, intent recognition, and dialog flow control.

The Technical Approach

I built a hybrid system combining rule-based and neural approaches:

**Architecture Components:**

1. Intent Recognition (Neural)
2. Entity Extraction (NER model)
3. Dialog Management (State machine + neural)
4. Response Generation (Template + GPT-based)
5. Context Management (Conversation memory)

**Core Implementation:**

```python
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from transformers import pipeline
import torch

class ConversationalChatbot:
    def __init__(self):
        # Intent classification
        self.intent_model = AutoModelForSequenceClassification.from_pretrained(
            "distilbert-base-uncased-finetuned-sst-2-english"
        )
        self.intent_tokenizer = AutoTokenizer.from_pretrained(
            "distilbert-base-uncased-finetuned-sst-2-english"
        )
        
        # Named Entity Recognition
        self.ner_pipeline = pipeline("ner", 
                                     model="dslim/bert-base-NER",
                                     aggregation_strategy="simple")
        
        # Response generation
        self.response_generator = pipeline("text-generation",
                                          model="microsoft/DialoGPT-medium")
        
        # Conversation state
        self.conversation_history = {}
        self.max_history_length = 5
    
    def classify_intent(self, user_input):
        inputs = self.intent_tokenizer(user_input, 
                                       return_tensors="pt", 
                                       truncation=True, 
                                       max_length=512)
        
        with torch.no_grad():
            outputs = self.intent_model(**inputs)
            predictions = torch.nn.functional.softmax(outputs.logits, dim=-1)
            intent_id = torch.argmax(predictions).item()
        
        intent_map = {
            0: "greeting",
            1: "question",
            2: "complaint",
            3: "request",
            4: "farewell"
        }
        
        return intent_map.get(intent_id, "unknown")
    
    def extract_entities(self, user_input):
        entities = self.ner_pipeline(user_input)
        return {entity['entity_group']: entity['word'] for entity in entities}
    
    def manage_context(self, session_id, user_input, bot_response):
        if session_id not in self.conversation_history:
            self.conversation_history[session_id] = []
        
        # Add to history
        self.conversation_history[session_id].append({
            "user": user_input,
            "bot": bot_response,
            "timestamp": datetime.now()
        })
        
        # Keep only recent history
        if len(self.conversation_history[session_id]) > self.max_history_length:
            self.conversation_history[session_id] = \
                self.conversation_history[session_id][-self.max_history_length:]
    
    def generate_response(self, user_input, session_id=None, context=None):
        # Step 1: Classify intent
        intent = self.classify_intent(user_input)
        
        # Step 2: Extract entities
        entities = self.extract_entities(user_input)
        
        # Step 3: Get conversation context
        history = self.conversation_history.get(session_id, [])
        
        # Step 4: Generate response based on intent
        if intent == "greeting":
            response = "Hello! How can I help you today?"
        
        elif intent == "question":
            # Use knowledge base or generative model
            response = self.answer_question(user_input, entities, history)
        
        elif intent == "complaint":
            response = self.handle_complaint(user_input, entities)
        
        else:
            # Fallback to generative model
            response = self.generate_fallback_response(user_input, history)
        
        # Step 5: Update context
        if session_id:
            self.manage_context(session_id, user_input, response)
        
        return {
            "response": response,
            "intent": intent,
            "entities": entities,
            "confidence": 0.85
        }
    
    def answer_question(self, question, entities, history):
        # Retrieve relevant information from knowledge base
        kb_results = self.query_knowledge_base(question, entities)
        
        if kb_results:
            return self.format_kb_response(kb_results)
        else:
            # Fallback to generative response
            return self.generate_fallback_response(question, history)
    
    def generate_fallback_response(self, user_input, history):
        # Build context from history
        context = " ".join([turn["user"] for turn in history[-3:]])
        full_input = f"{context} {user_input}"
        
        # Generate response
        response = self.response_generator(full_input, 
                                          max_length=100, 
                                          num_return_sequences=1)
        
        return response[0]['generated_text']
```

**Why This Architecture?**

Pure neural chatbots (like GPT alone) can be unpredictable and sometimes generate inappropriate responses. Pure rule-based systems are rigid and can't handle variations.

This hybrid approach:
- Uses neural models for understanding (intent, entities)
- Uses rules for controlled responses (greetings, standard queries)
- Falls back to generation for edge cases
- Maintains context for coherent conversations

**Model Choices**

**Intent Classification:** DistilBERT (fine-tuned)
- Fast inference (50ms)
- Lightweight (66M parameters vs 110M for BERT)
- Accurate enough for our 15 intent classes (92% accuracy)

**Entity Extraction:** dslim/bert-base-NER
- Recognized person names, locations, organizations, dates
- Pre-trained on CoNLL-2003
- Fine-tuned on our domain data

**Response Generation:** DialoGPT (Microsoft)
- Better at dialog than GPT-2
- Contextual responses
- Fine-tuned on Reddit conversations

**The Reality Check**

My initial chatbot was terrible at maintaining context. Example conversation:

User: "I want to book a flight"  
Bot: "Where would you like to go?"  
User: "New York"  
Bot: "How can I help you today?" (forgot the context!)

The problem: I wasn't properly managing conversation state or passing context between turns.

**The Solution:**

1. Implemented session-based conversation memory
2. Added context window (last 5 turns)
3. Created a state machine for multi-turn flows
4. Used conversation history to disambiguate pronouns

**Production Challenges I Faced**

Challenge 1: Context Management

Users expected the bot to remember previous messages, but my initial implementation lost context after each response.

**Solution:** Implemented Redis-based session storage with 30-minute TTL. Stored last 5 conversation turns per session. Passed context to all downstream models.

Challenge 2: Handling Ambiguity

User: "I want that"  
Bot: "I don't understand. What would you like?"

The bot couldn't resolve pronouns or vague references.

**Solution:** Added coreference resolution using neuralcoref library. Replaced pronouns with actual entities from context before processing.

Challenge 3: Inappropriate Responses

DialoGPT occasionally generated responses that were too casual or inappropriate for customer service.

**Solution:** 
- Fine-tuned DialoGPT on customer service conversations
- Added response filtering to reject inappropriate content
- Implemented fallback templates for sensitive topics

Challenge 4: Latency

Initial response time was 4-6 seconds. Users dropped off after 3 seconds.

**Solution:**
- Model quantization (40% faster)
- Cached common intents and responses
- Async processing for non-critical tasks
- Switched to DistilBERT (from BERT) for intent classification

Final latency: 1.4 seconds average.

**Results and Impact**

After 4 months in production:

- Handled 125,000+ conversations
- Average response time: 1.4 seconds
- Intent classification accuracy: 92%
- User satisfaction: 4.1/5
- Reduced customer service load by 40%
- 24/7 availability with 99.7% uptime

**What I Learned**

1. Context management is harder than it looks
2. Hybrid systems (rules + neural) often work better than pure neural for production
3. Users expect instant responses (under 2 seconds)
4. Fine-tuning on domain data is critical for appropriate responses
5. Fallback strategies are essential (always have a plan B)
6. Monitoring conversation quality requires both automated metrics and human review

---

Project 3: Multi-language Translation System

The Challenge

Build a translation system that could:

- Translate between 15+ language pairs
- Handle low-resource languages (not just English-Spanish)
- Maintain context and tone
- Process 10,000+ translations per day
- Support real-time translation (under 2 seconds)
- Handle technical and casual language

This was the most challenging project because translation quality varies dramatically across language pairs.

The Technical Approach

I used mT5 (multilingual T5) as the backbone, with custom fine-tuning for each language pair.

**Architecture:**

```python
from transformers import MT5ForConditionalGeneration, MT5Tokenizer
import torch

class MultilingualTranslator:
    def __init__(self):
        self.model = MT5ForConditionalGeneration.from_pretrained("google/mt5-base")
        self.tokenizer = MT5Tokenizer.from_pretrained("google/mt5-base")
        
        # Language pair specific models (fine-tuned)
        self.specialized_models = {}
        
        # Supported languages
        self.supported_languages = [
            "en", "es", "fr", "de", "zh", "ja", "ko", "ar", "hi", "pt",
            "ru", "it", "nl", "pl", "tr"
        ]
    
    def load_specialized_model(self, source_lang, target_lang):
        pair = f"{source_lang}-{target_lang}"
        if pair not in self.specialized_models:
            model_path = f"models/mt5-{pair}"
            try:
                self.specialized_models[pair] = \
                    MT5ForConditionalGeneration.from_pretrained(model_path)
            except:
                # Fallback to base model
                self.specialized_models[pair] = self.model
        
        return self.specialized_models[pair]
    
    def detect_language(self, text):
        # Use langdetect or fasttext for language detection
        from langdetect import detect
        try:
            return detect(text)
        except:
            return "en"  # Default fallback
    
    def translate(self, text, source_lang=None, target_lang="en", 
                 preserve_formatting=True):
        # Auto-detect source language if not provided
        if source_lang is None:
            source_lang = self.detect_language(text)
        
        # Validate language support
        if source_lang not in self.supported_languages:
            raise ValueError(f"Unsupported source language: {source_lang}")
        if target_lang not in self.supported_languages:
            raise ValueError(f"Unsupported target language: {target_lang}")
        
        # Load appropriate model
        model = self.load_specialized_model(source_lang, target_lang)
        
        # Prepare input
        input_text = f"translate {source_lang} to {target_lang}: {text}"
        inputs = self.tokenizer(input_text, 
                               return_tensors="pt", 
                               max_length=512, 
                               truncation=True)
        
        # Generate translation
        with torch.no_grad():
            outputs = model.generate(
                inputs["input_ids"],
                max_length=512,
                num_beams=4,
                length_penalty=0.6,
                early_stopping=True,
                no_repeat_ngram_size=3
            )
        
        translation = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        
        return {
            "translation": translation,
            "source_lang": source_lang,
            "target_lang": target_lang,
            "confidence": 0.89
        }
    
    def batch_translate(self, texts, source_lang, target_lang):
        # Batch processing for efficiency
        translations = []
        batch_size = 8
        
        for i in range(0, len(texts), batch_size):
            batch = texts[i:i+batch_size]
            batch_results = self._batch_process(batch, source_lang, target_lang)
            translations.extend(batch_results)
        
        return translations
```

**Why mT5?**

I evaluated several models:

**mT5 (google/mt5-base):**
- Supports 100+ languages
- Good zero-shot performance
- Can be fine-tuned for specific pairs
- Decent speed (1.8s per translation)

**M2M-100 (facebook/m2m100):**
- Excellent quality
- Direct many-to-many translation
- Too slow (4.2s per translation)
- Large model size (1.2GB)

**MarianMT:**
- Very fast (0.8s per translation)
- Limited language coverage
- Separate model per language pair
- Good for high-resource pairs only

I chose mT5 because it balanced quality, speed, and language coverage.

**Fine-tuning Strategy**

The base mT5 model was decent but not great for specialized domains. I fine-tuned separate models for:

1. High-resource pairs (English-Spanish, English-French, etc.)
2. Low-resource pairs (English-Hindi, Arabic-French, etc.)
3. Technical content (legal, medical, technical docs)

Training data:
- 500K sentence pairs per high-resource language
- 100K sentence pairs per low-resource language
- Domain-specific: 50K pairs for legal, 50K for medical

**The Reality Check**

My first version had terrible quality for low-resource languages. English to Hindi translations were almost incomprehensible.

Example:

English: "Please review the document and provide feedback"  
Hindi (bad): "कृपया दस्तावेज़ की समीक्षा करें और प्रतिक्रिया दें" (grammatically broken)

The problem: mT5 was trained mostly on high-resource languages. Low-resource pairs needed much more fine-tuning.

**The Solution:**

1. Back-translation data augmentation (generated 200K synthetic Hindi examples)
2. Fine-tuned on domain-specific data
3. Added post-editing suggestions
4. Implemented quality scoring to flag poor translations

Quality improved from 45% accuracy to 78% for low-resource pairs.

**Production Challenges I Faced**

Challenge 1: Handling Context

Translations lost context across sentences. Pronouns were translated incorrectly.

Example:

Sentence 1: "John went to the store"  
Sentence 2: "He bought milk"

Translating sentence 2 alone: "He" becomes ambiguous in many languages.

**Solution:** Implemented document-level translation with sliding context window. Passed previous 2 sentences as context.

Challenge 2: Preserving Formatting

Users wanted to preserve markdown, HTML, or special formatting in translations.

**Solution:**
- Extract formatting markers before translation
- Translate plain text
- Re-insert markers in correct positions
- Validate output formatting

Challenge 3: Quality Consistency

Translation quality varied wildly across different input types (formal vs casual, technical vs general).

**Solution:**
- Separate models for formal vs casual content
- Domain detection (technical, legal, casual, etc.)
- Route to appropriate specialized model
- Quality scoring on output

Challenge 4: Speed vs Quality

High-quality models (beam search, large models) were too slow. Fast models had poor quality.

**Solution:**
- Model distillation (created smaller, faster versions)
- Quantization (INT8 instead of FP32)
- Caching common translations
- Async processing for non-urgent requests

Final speed: 1.6 seconds average (down from 4.2s).

**Results and Impact**

After 6 months in production:

- Translated 890,000+ texts
- Supported 15 languages (45 language pairs)
- Average translation time: 1.6 seconds
- Translation quality (BLEU score): 
  - High-resource pairs: 38.2
  - Low-resource pairs: 24.6
- User satisfaction: 4.3/5
- Enabled global expansion into 8 new markets

**What I Learned**

1. Low-resource language translation requires creative data augmentation
2. Context matters (document-level > sentence-level)
3. Domain-specific models outperform general models
4. Speed-quality tradeoffs require careful benchmarking
5. Users care about preserving formatting and tone
6. Quality scoring helps flag bad translations before they reach users

---

The Bigger Picture: Lessons Across All Three Projects

Looking back at these three systems, I learned lessons that apply beyond any single project.

1. Production ML is Different from Research ML

In research, you optimize for accuracy. In production, you optimize for:
- Speed (users won't wait)
- Reliability (99% uptime expected)
- Cost (GPU time is expensive)
- Maintainability (someone else will debug your code)

The best model is often not the most accurate one. It's the one that balances all these constraints.

2. Hybrid Approaches Often Win

Pure neural solutions sound elegant but often fail in production:
- Summarization: Hybrid (extractive + abstractive) beat pure approaches
- Chatbot: Rules + neural beat pure neural
- Translation: Base model + fine-tuning beat zero-shot

Real-world systems benefit from combining multiple techniques.

3. Data Quality Matters More Than Model Size

I wasted weeks trying bigger models before realizing my data was the problem:
- Text summarization improved 15% from better training data
- Chatbot accuracy jumped 20% from cleaning intent labels
- Translation quality doubled with domain-specific data

Good data > big models.

4. Speed is a Feature

Users don't care if your model is sophisticated. They care if it's fast:
- Summarization: Had to get under 5 seconds
- Chatbot: Had to hit under 2 seconds
- Translation: Had to stay under 2 seconds

I optimized models, used quantization, caching, and async processing to hit these targets. Speed is not optional.

5. Monitoring is Critical

Models degrade over time. I learned to monitor:
- Latency (response time)
- Error rates (failures per 1000 requests)
- Quality metrics (BLEU, accuracy, user ratings)
- Usage patterns (which features are used most)

Without monitoring, you won't know when things break.

6. Users Will Find Edge Cases You Never Imagined

No matter how much testing I did, users found ways to break things:
- Summarization: Users sent PDFs (not text)
- Chatbot: Users sent emojis and non-English characters
- Translation: Users sent code snippets and URLs

Build robust error handling and fallbacks.

---

Technical Stack Summary

Across all three projects, here's what I used:

**Core Frameworks:**
- Hugging Face Transformers (model loading, inference)
- PyTorch (model training, fine-tuning)
- FastAPI (REST API development)
- Docker (containerization)
- Redis (caching, session management)

**Models:**
- BART (text summarization)
- DistilBERT (intent classification)
- DialoGPT (chatbot response generation)
- mT5 (multi-language translation)
- Sentence Transformers (embeddings)

**Infrastructure:**
- AWS EC2 (compute)
- AWS S3 (model storage)
- PostgreSQL (data storage)
- Nginx (load balancing)
- Prometheus + Grafana (monitoring)

**Development Tools:**
- Jupyter (experimentation)
- Git (version control)
- MLflow (experiment tracking)
- pytest (testing)

---

Advice for Building Production NLP Systems

If you're building production NLP systems, here's what I wish I knew:

**1. Start Simple, Then Optimize**

Don't start with the most complex model. Start with:
- Simple baseline (rule-based or simple model)
- Measure performance
- Identify bottlenecks
- Optimize where needed

I wasted weeks on complex architectures before realizing simple solutions worked fine.

**2. Prioritize Latency Early**

Don't leave speed optimization for later. Bake it in from the start:
- Profile your code
- Use smaller models when possible
- Implement caching
- Use quantization
- Batch processing where applicable

**3. Build Robust Error Handling**

Users will send:
- Empty strings
- Non-UTF8 characters
- Extremely long inputs
- Malformed data
- Languages you don't support

Handle all of these gracefully with clear error messages.

**4. Monitor Everything**

Instrument your code to track:
- Request latency (p50, p95, p99)
- Error rates
- Model confidence scores
- Input/output lengths
- Cache hit rates

You can't improve what you don't measure.

**5. Plan for Model Updates**

Models will need updating. Design your system to:
- Load new models without downtime
- A/B test model versions
- Roll back if new models perform poorly
- Version all model artifacts

**6. Document Your Decisions**

Future you (or your teammates) will thank you. Document:
- Why you chose this model
- What alternatives you considered
- What hyperparameters you used
- What didn't work and why

---

What's Next for Me?

These three projects taught me that production NLP is about far more than training models. It's about building systems that are fast, reliable, maintainable, and useful.

**Current Focus:**
- Exploring LLM-based systems (GPT-4, Claude)
- Learning MLOps best practices (CI/CD for ML)
- Studying RAG (Retrieval-Augmented Generation)
- Contributing to open-source NLP tools

**Looking For:**
- Opportunities to build large-scale NLP systems
- Teams working on production ML challenges
- Projects combining multiple NLP tasks
- Roles focused on ML engineering (not just research)

---

Let's Connect!

Have you built production NLP systems? Faced similar challenges? I'd love to hear your experiences.

**Email:** aswinraja98@gmail.com  
**LinkedIn:** linkedin.com/in/ashwin-rajakannan-094876189  
**GitHub:** github.com/aswinraja98  
**Kaggle:** kaggle.com/ashwin0001

---

Final Thoughts

Building production NLP systems taught me humility. The gap between "it works on my laptop" and "it works for 10,000 users daily" is enormous.

But it also taught me the joy of seeing your work used by real people. When I see translations helping someone communicate across languages, or summaries saving hours of reading time, it makes all the debugging and optimization worth it.

To anyone starting in production ML: embrace the messiness. Learn from failures. Ship iteratively. And remember that the goal isn't the perfect model—it's the useful system.

---

This is the fourth post in my ML journey series. Check out my previous posts:

- From Electronics to AI: My Journey as an ML Developer (https://medium.com/@aswinraja98/from-electronics-to-ai-my-journey-as-an-ml-developer-dc0afaa1ad49)
- Detecting Cancer Through DNA: Building a ctDNA Detection System (https://medium.com/@aswinraja98/detecting-cancer-through-dna-my-journey-building-a-ctdna-detection-system-with-machine-learning-d780424c2fa3)
- From Data Engineering to NLP: Lessons from My First Three Tech Roles (https://medium.com/@aswinraja98/from-data-engineering-to-nlp-lessons-from-my-first-three-tech-roles-8eea3ed32a10)

Coming next: A practical guide to building these systems yourself!

What NLP projects should I cover next? Drop your suggestions below!

---

Tags: #MachineLearning #NLP #ProductionML #TextSummarization #Chatbot #Translation #AI #MLOps #Transformers #DeepLearning
