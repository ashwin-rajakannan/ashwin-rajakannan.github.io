import React, { useState } from "react";
import { Icons } from "@/components/icons";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setError(data.error || "Failed to send message.");
      }
    } catch (err) {
      setError("Network error. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">Email</label>
          <input
            type="email"
            name="email"
            placeholder="john@doe.com"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-900 dark:text-[#E5E7EB]">Message</label>
        <textarea
          name="message"
          placeholder="Type your message...."
          required
          value={form.message}
          onChange={handleChange}
          className="w-full p-4 rounded-lg bg-slate-50 dark:bg-[#1E293B] border-2 border-slate-200 dark:border-[#1F2937] focus:border-[#06B6D4] outline-none transition-all resize-none min-h-[120px] text-slate-900 dark:text-[#E5E7EB] placeholder:text-slate-400 dark:placeholder:text-[#9CA3AF]"
        />
      </div>
      <div className="flex flex-row items-center justify-between w-full mt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-[#06B6D4] to-[#0891B2] text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-[#06B6D4]/50 transition-all"
        >
          {loading ? "Sending..." : "Send"}
          <Icons.email className="h-4 w-4" />
        </button>
        <div className="flex gap-3 justify-end">
          <a href="https://github.com/ashwin-rajakannan" target="_blank" rel="noopener" aria-label="GitHub"><Icons.github className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="https://linkedin.com/in/aswinraja98" target="_blank" rel="noopener" aria-label="LinkedIn"><Icons.linkedin className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="https://medium.com/@aswinraja98" target="_blank" rel="noopener" aria-label="Medium"><Icons.medium className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="https://www.kaggle.com/ashwin0001" target="_blank" rel="noopener" aria-label="Kaggle"><Icons.kaggle className="h-7 w-7 text-[#06B6D4]" /></a>
          <a href="mailto:aswinraja98@gmail.com" aria-label="Email"><Icons.email className="h-7 w-7 text-[#06B6D4]" /></a>
        </div>
      </div>
      {success && <p className="text-green-600">Message sent successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
