import React, { useState } from "react";
import { Icons } from "@/components/icons"; // Adjust import if needed

function ContactFormAjax() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formspree.io/f/mjkpyozk", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });
      if (res.ok) {
        setStatus("Message sent successfully!");
        form.reset();
      } else {
        setStatus("Failed to send. Please try again.");
      }
    } catch {
      setStatus("Failed to send. Please try again.");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">
            Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Doe"
            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="john@doe.com"
            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">
          Message
        </label>
        <textarea
          name="message"
          required
          placeholder="Type your message...."
          className="w-full p-4 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all resize-none min-h-[120px] text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <button
          type="submit"
          className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#06B6D4]/50 transition-all"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
          <Icons.email className="h-4 w-4" />
        </button>
        <div className="flex gap-3 justify-end">
          <a href="https://github.com/ashwin-rajakannan" target="_blank" rel="noopener" aria-label="GitHub"><Icons.github className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="https://www.linkedin.com/in/ashwin-rajakannan/" target="_blank" rel="noopener" aria-label="LinkedIn"><Icons.linkedin className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="https://medium.com/@aswinraja98" target="_blank" rel="noopener" aria-label="Medium"><Icons.medium className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="https://www.kaggle.com/ashwin0001" target="_blank" rel="noopener" aria-label="Kaggle"><Icons.kaggle className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="mailto:aswinraja98@gmail.com" aria-label="Email"><Icons.email className="h-7 w-7 text-[#06B6D4]" /></a>
        </div>
      </div>
      {status && (
        <span className="text-green-600 dark:text-green-400 text-sm font-medium block mt-2">{status}</span>
      )}
    </form>
  );
}

export default ContactFormAjax;