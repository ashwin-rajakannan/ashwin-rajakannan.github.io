"use client";

import React from "react";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Icons } from "@/components/icons";
import DATA from "@/data/resume";
import { CertificationAccordion } from "@/components/certification-accordion";
import ContactFormAjax from "@/components/contact-form-ajax";
import { LanguageAccordion } from "@/components/language-accordion";
import { Phone, MapPin } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const [expandedCardId, setExpandedCardId] = React.useState<number | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      // Collapse expanded card if scrolled below projects section
      if (expandedCardId !== null) {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          const rect = projectsSection.getBoundingClientRect();
          if (rect.bottom < 0) {
            setExpandedCardId(null);
          }
        }
      }

      if (window.location.hash === "#projects") {
        const projectsSection = document.getElementById("projects");
        if (projectsSection) {
          const rect = projectsSection.getBoundingClientRect();
          const sectionTop = rect.top + window.scrollY;
          const sectionBottom = sectionTop + rect.height;
          const currentScroll = window.scrollY;

          if (
            currentScroll > sectionBottom + 100 ||
            currentScroll < sectionTop - 100
          ) {
            window.history.replaceState(null, "", window.location.pathname);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [expandedCardId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] space-y-10 pb-12">
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-8 z-50 p-3 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white shadow-lg hover:shadow-[#06B6D4]/50 transition-all hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Hero Section */}
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <div className="flex items-center gap-2">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#06B6D4] via-[#22D3EE] to-[#06B6D4] bg-clip-text text-transparent"
                  yOffset={8}
                  text={`Hi, I'm ${DATA.name.split(" ")[0]}`}
                />
                <span className="text-3xl sm:text-5xl xl:text-6xl">👋</span>
              </div>
              <BlurFadeText
                className="max-w-[600px] md:text-xl text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text="AI/ML Developer specializing in NLP and data engineering."
              />
            </div>
          </div>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="flex gap-4 mt-6">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-[#06B6D4] text-[#06B6D4] font-medium hover:bg-[#06B6D4] hover:text-white transition-all hover:shadow-lg hover:shadow-[#06B6D4]/30"
              >
                Get Resume
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white font-medium hover:shadow-lg hover:shadow-[#06B6D4]/50 transition-all"
              >
                Contact Me
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                About
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                  Driven by curiosity and precision, I turn data into intelligent systems
                </span>
              </h2>
              <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                From building NLP models with Transformers to engineering scalable data pipelines with Docker and Flask, 
                each project and certification has shaped my journey toward mastering the AI–ML ecosystem. 
                My achievements aren&apos;t measured in numbers—they&apos;re reflected in every model that learns, adapts, and performs better than before.
              </p>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* Work Experience Section */}
      <section id="work">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Work Experience
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    My Professional Journey
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Building AI solutions and data pipelines across multiple roles and industries.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-3 max-w-2xl mx-auto">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Education
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Academic Background
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My educational foundation in computer science and engineering.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="flex min-h-0 flex-col gap-y-3 max-w-2xl mx-auto">
            {DATA.education.map((education, id) => (
              <BlurFade
                key={education.school}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
              >
                <ResumeCard
                  key={education.school}
                  href={education.href}
                  logoUrl={education.logoUrl}
                  altText={education.school}
                  title={education.school}
                  subtitle={education.degree}
                  period={`${education.start} - ${education.end}`}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  Skills
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Technical Expertise
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Technologies and tools I work with to build intelligent solutions.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="max-w-2xl mx-auto">
            {DATA.skillsByCategory ? (
              <div className="space-y-4">
                {DATA.skillsByCategory.map((group, gid) => (
                  <div key={group.category} className="space-y-2">
                    <BlurFade delay={BLUR_FADE_DELAY * 10 + gid * 0.05}>
                      <h3 className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                        {group.category}
                      </h3>
                    </BlurFade>
                    <div className="flex flex-wrap gap-1">
                      {group.skills.map((skill, sid) => (
                        <BlurFade
                          key={skill}
                          delay={BLUR_FADE_DELAY * 11 + (gid + sid) * 0.02}
                        >
                          <span className="px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-sm font-semibold bg-transparent">{skill}</span>
                        </BlurFade>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1">
                {DATA.skills.map((skill, id) => (
                  <BlurFade
                    key={skill}
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                  >
                    <span className="px-3 py-1 border border-[#06B6D4] text-[#06B6D4] rounded-lg text-sm font-semibold bg-transparent">{skill}</span>
                  </BlurFade>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
                  <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
                    Check out my latest work
                  </span>
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve built a range of AI-driven solutions — from deep learning models to scalable backend systems — here are some of my key highlights.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="w-full max-w-[900px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {DATA.projects.map((project, id) => (
                <BlurFade key={project.title} delay={BLUR_FADE_DELAY * 12 + id * 0.05}>
                  <div className="h-full flex flex-col w-full">
                    <ProjectCard
                      href={project.href}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies ? [...project.technologies] : undefined}
                      image={project.image}
                      video={project.video}
                      links={project.links ? [...project.links] : undefined}
                      isTextSummarization={project.title === "Text Summarization System"}
                      isSentimentAnalysis={project.title === "Sentiment Analysis Tool"}
                      expanded={expandedCardId === id}
                      onExpand={() => setExpandedCardId(id)}
                      onCollapse={() => setExpandedCardId(null)}
                    />
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Achievements / Certifications Section */}
<section id="achievements">
  <div className="space-y-12 w-full py-12">
    <BlurFade delay={BLUR_FADE_DELAY * 13}>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
            Relevant Coursework
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-slate-900 dark:text-[#E5E7EB] pb-2 leading-tight">
            <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
          <p className="text-slate-700 dark:text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            I completed every certification with one goal — to keep learning, exploring, and pushing the boundaries of what I can create with AI and data.
          </p>
        </div>
      </div>
    </BlurFade>
    <BlurFade delay={BLUR_FADE_DELAY * 14}>
      <div className="flex flex-col gap-2 justify-center max-w-[700px] mx-auto">
        {DATA.certifications?.map((cert, idx) => (
          <CertificationAccordion key={cert.title + cert.year} cert={cert} idx={idx} />
        ))}
      </div>
    </BlurFade>
  </div>
</section>

{/* Languages Section */}
<section id="languages" className="w-full py-12">
  <div className="space-y-8 max-w-2xl mx-auto text-center">
    <span className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
      Languages
    </span>
    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl pb-2 leading-tight mt-2 text-slate-900 dark:text-[#E5E7EB]">
      <span className="bg-gradient-to-r from-slate-900 via-[#06B6D4] to-slate-900 dark:from-[#E5E7EB] dark:via-[#22D3EE] dark:to-[#E5E7EB] bg-clip-text text-transparent">
        Languages I Speak
      </span>
    </h2>
    <p className="text-slate-700 dark:text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-2">
      Communication is key. Here are the languages I use every day.
    </p>
    <div className="flex flex-col gap-4 items-center mt-8">
      {DATA.languages.map((lang, idx) => (
        <LanguageAccordion
          key={lang.name}
          lang={lang}
          idx={idx}
        />
      ))}
    </div>
  </div>
</section>

{/* Contact Section - Reference Template UI with FormSpree AJAX */}
<section id="contact">
  <div className="space-y-12 w-full py-12">
    <BlurFade delay={BLUR_FADE_DELAY * 16}>
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <div className="inline-block rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white dark:text-[#0B0C10] px-3 py-1 text-sm font-semibold shadow-lg shadow-[#06B6D4]/20">
            Contact
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#22D3EE] dark:text-[#22D3EE] pb-2 leading-tight">
            Get in Touch
          </h2>
          <p className="text-slate-700 dark:text-slate-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Want to chat? Just shoot me a dm with a direct question and I&apos;ll respond whenever I can. I will ignore all soliciting.
          </p>
        </div>
      </div>
    </BlurFade>
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Contact Info Badges */}
      <BlurFade delay={BLUR_FADE_DELAY * 17}>
  <div className="flex flex-col gap-6">
    {/* Email Badge */}
    <a 
      href={`mailto:${DATA.contact.email}`} 
      className="flex items-center gap-4 group"
    >
      <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-3 rounded-full shrink-0 group-hover:scale-105 transition-transform">
        <Icons.email className="h-5 w-5 text-white" />
      </div>
      <span className="text-base font-normal text-slate-800 dark:text-slate-100 group-hover:text-[#06B6D4] transition-colors">
        {DATA.contact.email}
      </span>
    </a>
    {/* Phone Badge */}
    <a 
      href={`tel:${DATA.contact.phone}`} 
      className="flex items-center gap-4 group"
    >
      <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-3 rounded-full shrink-0 group-hover:scale-105 transition-transform">
        <Phone className="h-5 w-5 text-white" />
      </div>
      <span className="text-base font-normal text-slate-800 dark:text-slate-100 group-hover:text-[#06B6D4] transition-colors">
        {DATA.contact.phone}
      </span>
    </a>
    {/* Location Badge */}
    <a 
      href={DATA.contact.locationLink}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group"
    >
      <div className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] p-3 rounded-full shrink-0 group-hover:scale-105 transition-transform">
        <MapPin className="h-5 w-5 text-white" />
      </div>
      <span className="text-base font-normal text-slate-800 dark:text-slate-100 group-hover:text-[#06B6D4] transition-colors">
        {DATA.contact.location}
      </span>
    </a>
  </div>
</BlurFade>

      {/* Contact Form - FormSpree AJAX */}
      <ContactFormAjax />

      {/* Social Icons row below form removed. Only icons in form row remain. */}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="w-full py-6 border-t border-slate-200 dark:border-[#1F2937]">
        <div className="text-center">
          <p className="text-sm text-slate-600 dark:text-[#9CA3AF]">
            © Developer Portfolio by Ashwin Rajakannan
          </p>
        </div>
      </footer>
    </div>
  );
}