import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

// Example skills for demo. In real use, add these to your DATA.certifications array.
const CERT_SKILLS: Record<string, string[]> = {
  "Applied Machine Learning in Python": [
    "Dimensionality Reduction",
    "Scikit Learn (Machine Learning Library)",
    "Predictive Modeling",
    "Supervised Learning",
    "Regression Analysis",
    "Feature Engineering",
    "Random Forest Algorithm",
    "Applied Machine Learning",
    "Machine Learning",
    "Python Programming",
    "Unsupervised Learning",
    "Decision Tree Learning",
  ],
    "Introduction to Data Science in Python": [
      "Data Cleansing",
      "Data Import/Export",
      "Programming Principles",
      "Pivot Tables and Charts",
      "Data Manipulation",
      "Probability & Statistics",
      "Python Programming",
      "Statistical Analysis",
      "Data Analysis",
      "Jupyter",
      "Fundamentals of Data Manipulation with Python",
      "Data Processing with Pandas",
      "Answering Questions with Messy Data",
    ],
    "Python Data Structures": [
      "Data Structures in Python",
      "Lists, Dictionaries, Tuples, Sets",
      "Iteration and Looping",
      "Manipulating Data Collections",
      "Searching and Sorting",
      "Nested Data Structures",
    ],
    "Programming for Everybody (Getting Started with Python)": [
      "Programming Principles",
      "Computer Programming",
      "Integrated Development Environments",
      "Debugging",
      "Development Environment",
      "Python Programming",
      "Python as a Calculator",
      "Functions",
      "Logic and Conditionals",
      "Python Modules",
    ],
    "Microsoft Azure Fundamentals (AZ-900)": [
      "Cloud Concepts",
      "Azure Architecture and Services",
      "Azure Management and Governance",
      "Compute, Networking, Storage",
      "Security, Governance, Administration",
      "Infrastructure Management",
      "Database Management",
      "Software Development",
    ],
    "Python for Data Science": [
      "Exploratory Data Analysis",
      "Data Transformation",
      "Applied Machine Learning",
      "Probability & Statistics",
      "Jupyter",
      "Feature Engineering",
      "Statistical Analysis",
      "Data Processing",
      "Data Science",
      "Data wrangling with Python",
      "Data pre-processing",
    ],
  // Add more certs and skills as needed
};

export function CertificationAccordion({ cert, idx }: { cert: any; idx: number }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="w-full mb-4">
      <button
        className={`flex items-center w-full px-6 py-4 bg-transparent border border-slate-200 dark:border-[#06B6D4]/20 rounded-lg shadow-md focus:outline-none transition-all ${open ? "rounded-b-none" : "rounded-b-lg"}`}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`cert-panel-${idx}`}
      >
  <span className="font-semibold text-base text-slate-700 dark:text-[#E5E7EB] flex-1 text-left truncate">{cert.title}</span>
        <span className="text-xs text-muted-foreground font-semibold mx-4 w-14 text-right">{cert.year}</span>
  <span className="px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-xs font-semibold bg-transparent mx-2">Certificate</span>
  <span className="ml-2">{open ? <ChevronUp className="w-5 h-5 text-black dark:text-[#E5E7EB]" /> : <ChevronDown className="w-5 h-5 text-black dark:text-[#E5E7EB]" />}</span>
      </button>
      {open && (
        <div
          id={`cert-panel-${idx}`}
          className="rounded-b-lg bg-transparent border-x border-b border-slate-200 dark:border-[#06B6D4]/20 shadow-md px-6 pt-2 pb-6"
        >
          <div className="text-xs text-slate-700 dark:text-[#E5E7EB] mb-2">{cert.institution}</div>
          <div className="text-base font-bold text-slate-700 dark:text-[#E5E7EB] mb-2 mt-2">Skills Gained:</div>
          <div className="flex flex-wrap gap-3 mb-6">
            {(CERT_SKILLS[cert.title] || []).map((skill) => (
              <span key={skill} className="px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-sm font-semibold bg-transparent">
                {skill}
              </span>
            ))}
          </div>
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit px-6 py-3 border border-border text-foreground rounded-lg font-semibold text-base hover:bg-border hover:text-background transition-all"
          >
            View Certificate
          </a>
        </div>
      )}
    </div>
  );
}