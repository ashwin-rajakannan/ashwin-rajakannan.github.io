From Data Engineering to NLP: Lessons from My First Three Tech Roles

What I learned working at SATURAM, Nirvoday, and Assisto Technologies

Every job teaches you something different. Some teach you technical skills, others teach you about business, and some teach you about yourself. Over 18 months, I worked at three different companies, each shaping my understanding of AI/ML and software development in unique ways.

Here's what I learned from being a **Trainee Data Engineer**, a **Business Development Associate**, and a **Junior ML Developer** — and how each role contributed to who I am as an AI/ML developer today.

---

The Timeline: My Journey Across Three Companies

**SATURAM (Jan 2022 - Jul 2022):** Trainee Data Engineer  
**Nirvoday Pvt. Ltd (Dec 2022 - Jan 2023):** Business Development Associate  
**Assisto Technologies (Apr 2023 - Jun 2023):** Junior ML Developer  

Each role was different. Each taught me something critical. Let me walk you through them.

---

Role 1: SATURAM — Where I Learned to Build Foundations

**Position:** Trainee Data Engineer  
**Duration:** 6 months (Jan 2022 - Jul 2022)  
**The Project:** Advanced Data Engineering for Cloud & ML Ecosystem

What I Did

At SATURAM, I entered the world of **data engineering** — the unglamorous but absolutely critical foundation of any ML system.

My key responsibilities:
- **Building RESTful APIs with Flask** for data extraction and manipulation
- **Working with SQL databases** to query, transform, and optimize data
- **Using Docker** to containerize applications for consistent deployment
- **Web scraping** to collect data from various sources
- **Data pipeline development** for processing large datasets

The Technical Stack

```python
# A typical Flask API endpoint I built
from flask import Flask, jsonify, request
import psycopg2

app = Flask(__name__)

@app.route('/api/data', methods=['GET'])
def get_data():
    conn = psycopg2.connect(database="mydb", user="user")
    cur = conn.cursor()
    cur.execute("SELECT * FROM table WHERE condition")
    results = cur.fetchall()
    return jsonify(results)
```

**Technologies:**
- **Flask** — Lightweight web framework for building APIs
- **Python** — Data manipulation and scripting
- **SQL** — Database queries and optimization
- **Docker** — Containerization and deployment
- **BeautifulSoup/Scrapy** — Web scraping tools

What I Learned

1. Good ML Starts with Good Data

Before SATURAM, I thought ML was all about models. After SATURAM, I realized:

**80% of ML work is data engineering. Only 20% is modeling.**

You can have the best neural network in the world, but if your data pipeline is broken, your model is useless.

2. APIs Are the Backbone of Modern Systems

Building RESTful APIs taught me:
- How to design clean, scalable interfaces
- The importance of proper error handling
- How to structure data for downstream consumption
- Why documentation matters

3. Docker Changes Everything

Containerization solved the classic "it works on my machine" problem. I learned:
- How to write Dockerfiles
- Container orchestration basics
- Why reproducibility matters
- How to deploy applications consistently

4. SQL is Non-Negotiable

No matter how fancy your ML tools are, you need to know SQL. I learned:
- Complex joins and subqueries
- Query optimization
- Database indexing
- How to think in sets, not loops

The Challenge That Defined This Role

**Problem:** We needed to scrape data from multiple sources, clean it, store it in a database, and expose it via an API — all in a scalable way.

**Solution:** I built an end-to-end pipeline:
1. **Web scraping scripts** (Python with BeautifulSoup)
2. **Data cleaning and validation** (Pandas)
3. **PostgreSQL database** for storage
4. **Flask API** for data access
5. **Docker containers** for deployment

**Lesson:** Building systems is about connecting pieces, not just writing code.

---

Role 2: Nirvoday (Exotic Learning) — The Business Perspective

**Position:** Business Development Associate  
**Duration:** 2 months (Dec 2022 - Jan 2023)  
**The Focus:** Education Sector Expansion

What I Did

This was a completely different role. No coding. No models. Just pure **business development**.

My responsibilities:
- Developing strategies to expand the company's reach in education
- Building relationships with educational institutions
- Understanding customer needs and pain points
- Engaging with business stakeholders
- Market research and competitive analysis

Why I Took This Role

After 6 months of intense technical work at SATURAM, I wanted to understand the **business side of technology**. 

Questions I wanted to answer:
- How do companies sell technical solutions?
- What do customers actually care about?
- How do you communicate technical value to non-technical people?

What I Learned

1. Technical Excellence ≠ Business Success

The best technology doesn't always win. The technology that's:
- **Easy to understand**
- **Solves a clear problem**
- **Fits the customer's budget**
- **Has good support**

...that's what wins.

2. Communication is a Skill

As a developer, I could explain how a neural network works. But could I explain **why a business should care**?

I learned to:
- Translate technical features into business benefits
- Listen to what customers actually need
- Present ideas clearly and concisely
- Handle objections and questions

3. Empathy for Non-Technical Stakeholders

Working in business development taught me empathy for:
- Product managers who need to balance features and timelines
- Sales teams who need to communicate technical capabilities
- Customers who don't care about your tech stack

This would prove invaluable in my later ML roles.

4. The Education Sector is Unique

Educational institutions have different priorities:
- Long sales cycles
- Budget constraints
- Risk aversion (can't experiment with student data)
- Compliance requirements

Understanding this taught me that **context matters** in every project.

The Turning Point

After two months, I realized something important:

**I loved building things more than selling them.**

This role confirmed my passion for technical work, but gave me the business acumen to build things that actually matter to users.

---

Role 3: Assisto Technologies — My NLP Awakening

**Position:** Junior ML Developer  
**Duration:** 3 months (Apr 2023 - Jun 2023)  
**The Technology:** Natural Language Processing with Transformers

What I Did

This was my first real dive into **production machine learning**. At Assisto, I worked on:

- **NLP models using Transformer architectures** (MT5, T5, Byt5)
- **Data pipeline optimization** with Jina AI and Haystack
- **Model performance tuning** and evaluation
- **API integration** for ML model deployment
- **Multilingual text processing**

The Technical Stack

**Core Models:**
- **MT5 (Multilingual T5)** — Cross-lingual text generation
- **T5 (Text-to-Text Transfer Transformer)** — Universal text-to-text framework
- **Byt5** — Byte-level T5 for robust multilingual processing

**Frameworks:**
- **Hugging Face Transformers** — Pre-trained models and fine-tuning
- **Jina AI** — Neural search framework
- **Haystack** — NLP framework for building search systems
- **PyTorch** — Deep learning framework

**Infrastructure:**
- **Docker** (from SATURAM experience!)
- **Flask APIs** (from SATURAM experience!)
- **Cloud deployment** (Azure)

What I Learned

1. Transformers are Game-Changers

Working with Transformer models was like unlocking a superpower:

```python
from transformers import T5ForConditionalGeneration, T5Tokenizer

# Load pre-trained model
model = T5ForConditionalGeneration.from_pretrained("t5-base")
tokenizer = T5Tokenizer.from_pretrained("t5-base")

# Text generation
input_text = "translate English to French: Hello, how are you?"
inputs = tokenizer(input_text, return_tensors="pt")
outputs = model.generate(**inputs)
result = tokenizer.decode(outputs[0])
```

**Why Transformers matter:**
- **Pre-trained on massive datasets** — Transfer learning at scale
- **Attention mechanism** — Understand context better than RNNs
- **Versatile** — Translation, summarization, Q&A, generation
- **Multilingual capabilities** — One model, many languages

2. Production ML ≠ Research ML

In research/academic projects, you can experiment freely. In production:

- **Latency matters** — Users won't wait 10 seconds for a response
- **Memory matters** — Can't load a 10GB model on every request
- **Reliability matters** — 95% accuracy isn't enough if it fails on critical inputs
- **Costs matter** — GPU time is expensive

I learned to optimize models for:
- **Faster inference** (model quantization, caching)
- **Smaller memory footprint** (model distillation)
- **Better error handling** (fallback mechanisms)
- **Cost efficiency** (batch processing, smart caching)

3. Data Pipelines Matter Even More

My SATURAM experience in data engineering became incredibly valuable. I learned:

**With Jina AI:**
- Building neural search systems
- Document indexing and retrieval
- Embedding-based similarity search

**With Haystack:**
- Question answering pipelines
- Document processing workflows
- Combining retrieval and generation

4. Integration is Where the Magic Happens

The best model in the world is useless if it can't integrate with existing systems. I learned:

- **API design** for ML models
- **Error handling** for production systems
- **Monitoring and logging** for debugging
- **Documentation** for team collaboration

The Project That Defined This Role

**Challenge:** Build a multilingual text processing system that could:
1. Accept text in multiple languages
2. Process and understand the content
3. Generate responses or translations
4. Return results via API

**My Approach:**

```python
# Simplified architecture
from transformers import MT5ForConditionalGeneration
from haystack import Pipeline
from flask import Flask, request, jsonify

# 1. Load multilingual model
model = MT5ForConditionalGeneration.from_pretrained("google/mt5-base")

# 2. Build processing pipeline
pipeline = Pipeline()
pipeline.add_node(component=preprocessor, name="Preprocessor")
pipeline.add_node(component=model, name="Transformer")
pipeline.add_node(component=postprocessor, name="Postprocessor")

# 3. Expose via API
app = Flask(__name__)

@app.route('/process', methods=['POST'])
def process_text():
    text = request.json['text']
    result = pipeline.run(text)
    return jsonify(result)
```

**Results:**
- Successfully processed text in 10+ languages
- Achieved low latency (<2 seconds for most queries)
- Integrated seamlessly with existing systems
- Improved model performance through fine-tuning

**Key Lesson:** Integration + Optimization = Production-Ready ML

---

The Bigger Picture: How These Roles Connect

Looking back, each role prepared me for the next:

SATURAM → Nirvoday  
**Data Engineering → Business Development**

Understanding data pipelines helped me appreciate what makes a product valuable. I could see:
- Where technical complexity adds value
- Where it's just complexity for complexity's sake
- What customers actually need vs. what's technically impressive

Nirvoday → Assisto  
**Business Development → ML Development**

Understanding customer needs made me a better ML developer because I could:
- Focus on solving real problems
- Communicate technical decisions to stakeholders
- Design solutions that fit business constraints
- Think about deployment, not just development

SATURAM → Assisto  
**Data Engineering → NLP**

My data engineering foundation was crucial for NLP work:
- Building efficient data pipelines for training data
- API development for model deployment
- Docker containerization for consistent environments
- Database integration for storing results

---

Lessons Across All Three Roles

1. Breadth Before Depth (Sometimes)

Each role gave me exposure to different aspects:
- **SATURAM:** Backend engineering, APIs, databases
- **Nirvoday:** Business strategy, customer relations
- **Assisto:** ML modeling, NLP, production systems

This breadth made me a **better specialist** because I understood context.

2. Soft Skills Matter as Much as Hard Skills

Technical skills got me the interviews. But what made me effective:
- **Communication** — Explaining technical concepts clearly
- **Adaptability** — Switching between roles and contexts
- **Collaboration** — Working with different teams
- **Business acumen** — Understanding why we're building something

3. The Best Learning Happens on the Job

You can take courses, read papers, and watch tutorials. But nothing compares to:
- Debugging a production API that's failing
- Optimizing a model that's too slow
- Explaining to a client why their idea won't work
- Integrating your code with someone else's system

4. Your Career is a Winding Path

My path wasn't linear:
- Data Engineering → Business Development → ML Development

But each detour taught me something valuable. The business role, even though it was non-technical, made me a better developer.

**Lesson:** Don't be afraid of lateral moves. They might teach you more than you expect.

---

What This Means for My Career Today

These three roles shaped how I approach ML development:

From SATURAM, I bring:

**Strong data engineering fundamentals**  
**API design and deployment experience**  
**Docker and containerization skills**  
**SQL and database optimization**  

From Nirvoday, I bring:

**Understanding of business requirements**  
**Communication skills for non-technical stakeholders**  
**Customer-focused thinking**  
**Strategic planning abilities**  

From Assisto, I bring:

**NLP expertise with Transformers**  
**Production ML experience**  
**Model optimization and deployment**  
**Pipeline integration skills**  

**Combined:** I'm not just an ML developer who can build models. I'm someone who can:
- Build the infrastructure to support those models
- Understand why the business needs them
- Deploy them into production systems
- Communicate their value to stakeholders

---

Advice for Early-Career Developers

If you're just starting out in ML/AI:

**Do This:**

**1. Start with Fundamentals**  
Learn data structures and algorithms  
Understand databases and SQL  
Build APIs and web services  
Master at least one programming language deeply

**2. Don't Skip Data Engineering**  
Most ML jobs involve more data wrangling than modeling  
Learn SQL, Pandas, data pipelines  
Understand ETL processes  
Get comfortable with databases

**3. Try Different Things Early**  
Don't lock yourself into one path immediately  
Try different roles (even non-technical ones)  
Work at different company types (startup, enterprise, education)  
Each experience teaches you something

**4. Build End-to-End Projects**  
Don't just train models in Jupyter notebooks  
Deploy something to production  
Build an API, containerize it, host it  
Experience the full lifecycle

**5. Learn to Communicate**  
Practice explaining technical concepts simply  
Write documentation  
Present your work  
Learn business terminology

**Avoid This:**

**1. Chasing Titles Too Early**  
"Junior Developer" vs "ML Engineer" matters less early on  
Focus on learning, not job titles  
Skills compound; titles don't

**2. Only Doing What's Comfortable**  
If you're only doing ML modeling, learn engineering  
If you're only doing engineering, learn ML  
If you're only doing tech, learn business

**3. Ignoring Production**  
Research code is different from production code  
Learn deployment, monitoring, scaling  
Understand what happens after training

**4. Working in Isolation**  
Join communities (Kaggle, GitHub, LinkedIn)  
Share your learnings  
Collaborate on projects  
Ask questions

---

What's Next for Me?

These three roles were just the beginning. They taught me:

**What I love:** Building NLP systems that solve real problems  
**What I'm good at:** Combining data engineering with ML modeling  
**What I want:** Production ML roles where I can build and deploy  

**Current focus:**
- Deepening NLP expertise (Transformers, LLMs, RAG systems)
- Building data engineering skills (Airflow, Spark, modern data stack)
- Production ML (MLOps, model monitoring, deployment)
- Open source contributions

**Looking for:**
- Roles combining NLP and data engineering
- Teams building production ML systems
- Projects with real-world impact
- Collaborative, learning-focused environments

---

Let's Connect!

Have you worked across different roles? Made career pivots? Learned from unexpected experiences?

I'd love to hear your story:

**Email:** aswinraja98@gmail.com  
**LinkedIn:** linkedin.com/in/ashwin-rajakannan-094876189  
**GitHub:** github.com/aswinraja98  
**Kaggle:** kaggle.com/ashwin0001  

---

Final Thoughts

Your career path doesn't have to be a straight line. Sometimes the detours teach you the most.

My journey through data engineering, business development, and ML development wasn't planned. But each role:
- Taught me something I didn't know I needed
- Prepared me for the next challenge
- Made me a more well-rounded developer

**To anyone early in their career:** Don't stress about finding the "perfect" role. Find roles that **challenge you, teach you, and push you to grow**.

The skills compound. The experiences connect. And eventually, you'll look back and see how it all made sense.

---

This is the third post in my ML journey series. Check out my previous posts:
- From Electronics to AI: My Journey as an ML Developer (https://medium.com/@aswinraja98/from-electronics-to-ai-my-journey-as-an-ml-developer-dc0afaa1ad49)
- Detecting Cancer Through DNA: Building a ctDNA Detection System (https://medium.com/@aswinraja98/detecting-cancer-through-dna-my-journey-building-a-ctdna-detection-system-with-machine-learning-d780424c2fa3)

Coming next: Deep dive into Hugging Face Transformers and production NLP!

What aspect of career development should I cover next? Drop your suggestions below!

---

Tags: #MachineLearning #CareerDevelopment #DataEngineering #NLP #BusinessDevelopment #MLOps #AI #SoftwareEngineering #CareerAdvice #TechCareers
