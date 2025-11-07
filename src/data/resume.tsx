import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";
import React from "react";

const DATA = {
  name: "Ashwin Rajakannan",
  initials: "AR",
  url: "https://github.com/ashwin-rajakannan",
  email: "aswinraja98@gmail.com",
  phone: "+91 6374511087",
  location: "Dharmapuri, Tamilnadu, India",
  locationLink: "https://www.google.com/maps/place/Dharmapuri,+Tamil+Nadu",
  about:
    "Driven by curiosity and precision, I turn data into intelligent systems. From building NLP models with Transformers to engineering scalable data pipelines with Docker and Flask, each project and certification has shaped my journey toward mastering the AI–ML ecosystem. My achievements aren't measured in numbers—they're reflected in every model that learns, adapts, and performs better than before.",
  summary:
    "AI/ML Developer specializing in NLP and data engineering.",
  description:
    "Driven by curiosity and precision, I turn data into intelligent systems. From building NLP models with Transformers to engineering scalable data pipelines with Docker and Flask, each project and certification has shaped my journey toward mastering the AI–ML ecosystem.",
  avatarUrl: "/avatar.png",
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
  email: "aswinraja98@gmail.com",
  phone: "+91 6374511087",
  location: "Dharmapuri, Tamilnadu, India",
  locationLink: "https://www.google.com/maps/place/Dharmapuri,+Tamil+Nadu",
  social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/ashwin-rajakannan",
        icon: Icons.github,
        navbar: true,
      },
      Kaggle: {
        name: "Kaggle",
        url: "https://www.kaggle.com/ashwin0001",
        icon: Icons.kaggle,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/ashwin-rajakannan-094876189",
        icon: Icons.linkedin,
        navbar: true,
      },
      Email: {
        name: "Email",
        url: "mailto:aswinraja98@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },
  skills: [
    "Python",
    "C++",
    "SQL",
    "Hugging Face Transformers",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Flask",
    "Pandas",
    "NumPy",
    "OpenCV",
    "Docker",
    "Git",
    "GitHub",
    "Azure",
    "Jupyter Notebooks",
    "VS Code",
    "PyCharm",
    "Linux",
    "Windows OS",
    "Microsoft Office Suite",
    "ChatGPT",
    "Claude",
    "GitHub Copilot",
    "Google Gemini",
    "Midjourney AI"
  ],
  skillsByCategory: [
    { 
      category: "Programming", 
      skills: ["Python", "C++", "SQL"]
    },
    {
      category: "Models & Libraries",
      skills: [
        "Hugging Face Transformers",
        "TensorFlow",
        "Scikit-learn & PyTorch",
        "Flask",
        "Pandas & NumPy",
        "OpenCV"
      ],
    },
    { 
      category: "Tools & Platforms", 
      skills: [
        "Docker",
        "Git & GitHub",
        "Azure",
        "Jupyter Notebooks",
        "VS Code",
        "PyCharm",
        "Linux & Windows OS",
        "Microsoft Office Suite"
      ]
    },
    {
      category: "AI Tools",
      skills: [
        "ChatGPT",
        "Claude",
        "GitHub Copilot",
        "Google Gemini",
        "Midjourney AI"
      ]
    },
  ],
  work: [
    {
      company: "Assisto Technologies Private Limited",
      title: "Junior ML Developer",
      start: "04/2023",
      end: "06/2023",
      href: "",
      logoUrl: "/Assisto-logo.png",
      description: "Worked on NLP models using Transformers (MT5, T5, Byt5). Optimized data pipelines with Jina AI and Haystack. Improved model performance and integrated APIs.",
    },
    {
      company: "Nirvoday Pvt. Ltd (Exotic Learning)",
      title: "Business Development Associate",
      start: "12/2022",
      end: "01/2023",
      href: "",
      logoUrl: "/exotic-learning-Logo.webp",
      description: "Developed strategies to expand the company's reach in the education sector. Built and maintained relationships with educational institutions and business stakeholders.",
    },
    {
      company: "SATURAM: Advanced Data Engineering for Cloud & ML Ecosystem",
      title: "Trainee Data Engineer",
      start: "01/2022",
      end: "07/2022",
      href: "",
      logoUrl: "/Saturam-logo.jpg",
      description: "Built RESTful APIs using Flask for data extraction and manipulation. Utilized Python, SQL, and Docker for data engineering tasks. Performed web scraping to collect and analyze data efficiently.",
    },
  ],
  projects: [
    {
      title: "Text Summarization System",
      description: "Production-ready text summarization system implementing extractive (BERT), abstractive (T5/BART), and hybrid approaches. Features CLI tool, ROUGE evaluation, and supports multiple NLP models for various use cases.",
        technologies: ["Python", "BERT", "T5", "BART", "Transformers", "PyTorch", "NLTK", "scikit-learn", "Text Summarization System"],
      href: "/projects/text-summarization-demo",
      dates: "2025",
  image: "/text-Summarization-System-logo.png",
      video: "",
      links: [
        {
          title: "Try Demo",
          href: "/projects/text-summarization-demo",
          icon: "Globe"
        },
        {
          title: "Source",
          href: "https://github.com/ashwin-rajakannan/text-summarization-system",
          icon: "Github"
        }
      ],
    },
    {
      title: "Genre-Based Book Recommender",
      description: "A book recommendation system that suggests books based on user ratings and genres using collaborative filtering. Built with Python and Surprise library, featuring a demo and professional documentation.",
      technologies: ["Python", "Surprise", "scikit-learn", "Collaborative Filtering", "Book Recommendation"],
      href: "/projects/genre-based-book-recommender",
      dates: "2025",
      image: "/genre-based-book-recommender.png",
      video: "",
      isBookRecommender: true,
      links: [
        {
          title: "Try Demo",
          href: "/projects/genre-based-book-recommender",
          icon: "Globe"
        },
        {
          title: "Source",
          href: "https://github.com/ashwin-rajakannan/genre-based-book-recommender",
          icon: "Github"
        }
      ]
    },
    {
      title: "Sentiment Analysis Tool",
  description: "Production-ready sentiment analysis system using Python and VADER (Valence Aware Dictionary and sEntiment Reasoner) for robust sentiment scoring. Features a Next.js/React frontend demo, and supports advanced NLP with scikit-learn and other Python libraries.",
  technologies: ["Python", "VADER", "scikit-learn", "NLP", "Next.js", "React"],
      href: "/projects/sentiment-analysis-demo",
      dates: "2025",
  image: "/sentiment-analysis-tool-logo.jpeg",
      video: "",
      links: [
        {
          title: "Try Demo",
          href: "/projects/sentiment-analysis-demo",
          icon: "Globe"
        },
        {
          title: "Source",
          href: "https://github.com/ashwin-rajakannan/sentiment-analysis-tool-v2",
          icon: "Github"
        }
      ],
    },
    {
      title: "Identification of Circulating Tumor DNA (ctDNA) Using Machine Learning",
      description: "Used CNNs for ctDNA detection and SVM for DNA classification. Applied spectrogram imaging, digital mapping (Keras), Canny edge detection, and scikit-learn for analysis.",
      technologies: ["CNN", "SVM", "Keras", "scikit-learn", "Python", "OpenCV"],
      href: "https://www.irjet.net/archives/V6/i4/IRJET-V6I413.pdf",
      dates: "2019",
      image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60",
      video: "",
      links: [
        {
          title: "Paper",
          href: "https://www.irjet.net/archives/V6/i4/IRJET-V6I413.pdf",
          icon: "FileText"
        }
      ],
    },
    {
      title: "Traffic Sign Recognition System",
      description: "Deep learning-based system for real-time traffic sign classification using CNNs trained on the GTSRB dataset. Features a modern Next.js/Tailwind CSS frontend and FastAPI backend. Includes image preprocessing, prediction, and technical badges.",
      technologies: ["Python", "TensorFlow", "FastAPI", "Next.js", "Tailwind CSS", "GTSRB", "Computer Vision", "Deep Learning"],
  href: "https://github.com/ashwin-rajakannan/traffic-signs-recognition-system",
      dates: "2025",
      image: "/traffic-sign-recognition-system-logo.png",
      video: "",
      links: [
        {
          title: "Source",
          href: "https://github.com/ashwin-rajakannan/traffic-signs-recognition-system",
          icon: "Github"
        }
      ],
    },
  ],
  education: [
    {
      school: "College of Engineering, Guindy, Anna University",
      degree: "M.E - Software Engineering",
      start: "2020",
      end: "2022",
      href: "https://ceg.annauniv.edu/profile.html",
      logoUrl: "/anna-university-logo.png",
    },
    {
      school: "SRM Institute of Science and Technology",
      degree: "B. Tech - Electronics and Communication Engineering",
      start: "2015",
      end: "2020",
      href: "https://www.srmist.edu.in/",
      logoUrl: "/srm-university-logo.png",
    },
  ],
  hackathons: [] as Array<{
    title: string;
    description: string;
    location: string;
    dates: string;
    links: Array<{ icon: React.ReactNode; title: string; href: string }>;
  }>,
  achievements: {
    list: [
      "M.E in Software Engineering - Anna University",
      "B.Tech in Electronics and Communication Engineering - SRM Institute",
    ],
  },
  certifications: [
    {
      title: "Applied Machine Learning in Python",
      institution: "University of Michigan - Coursera",
      year: "2024",
      link: "https://www.coursera.org/account/accomplishments/verify/ALFGA9QJT8EV"
    },
    {
      title: "Introduction to Data Science in Python",
      institution: "University of Michigan - Coursera",
      year: "2018",
      link: "https://www.coursera.org/account/accomplishments/verify/BUF4BDPKE66J"
    },
    {
      title: "Python Data Structures",
      institution: "University of Michigan - Coursera",
      year: "2023",
      link: "https://www.coursera.org/account/accomplishments/verify/CRKTXW8UGTT8"
    },
    {
      title: "Programming for Everybody (Getting Started with Python)",
      institution: "University of Michigan - Coursera",
      year: "2023",
      link: "https://www.coursera.org/account/accomplishments/verify/28GBPB2HT34R"
    },
    {
      title: "Microsoft Azure Fundamentals (AZ-900)",
      institution: "Microsoft",
      year: "2024",
      link: "https://learn.microsoft.com/en-us/users/ashwinrajakannan-1579/achievements/j9q8dfet"
    }
  ],
    languages: [
    {
      name: "Tamil",
      icon: "IN",
      level: "Native",
      proficiencyBar: "100%",
      description: "A southern language spoken in Tamil Nadu, India.",
      link: "https://en.wikipedia.org/wiki/Tamil_language"
    },
    {
      name: "English",
      icon: "GB",
      level: "Fluent",
      proficiencyBar: "90%",
      description: "A global language, widely used for international communication.",
      link: "https://en.wikipedia.org/wiki/English_language"
    }
  ],
} as const;

export default DATA;


