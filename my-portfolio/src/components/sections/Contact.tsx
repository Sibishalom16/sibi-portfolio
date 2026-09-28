"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import ContactRipple from "@/components/ui/ContactRipple";

const ease = [0.215, 0.61, 0.355, 1] as const;

export default function Contact() {
  const { contact, personal } = portfolioData;

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch(contact.apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message.");
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const fieldClass = "w-full border bg-transparent px-4 py-3.5 text-sm text-white placeholder:text-white/20 outline-none transition-all duration-300";

  return (
    <section
      id="contact"
      className="relative px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(132,204,22,0.18)" }}
    >
      {/* Lime ambient glow */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-1/2 h-[320px] w-[320px] -translate-y-1/2 z-0">
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(132,204,22,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-10 sm:gap-14 md:grid-cols-[1fr_1.4fr] md:gap-24">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs uppercase tracking-[0.22em] mb-3 sm:mb-4" style={{ color: "var(--lime)" }}>
              Get In Touch
            </p>

            <div className="relative">
              {/* Subtle expanding circular ripple behind contact heading */}
              <ContactRipple />

              <h2
                className="font-[family-name:var(--font-space-grotesk)] leading-tight tracking-[-0.05em]"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)" }}
              >
                Let&apos;s work
                <br />
                <span style={{ color: "var(--lime)" }}>together.</span>
              </h2>
            </div>

            <p
              className="mt-4 sm:mt-6 max-w-sm text-sm sm:text-base leading-relaxed"
              style={{ color: "rgba(240,240,242,0.58)" }}
            >
              {contact.description}
            </p>

            <div className="mt-8 sm:mt-10 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(240,240,242,0.38)" }}>Email</span>
                <p className="mt-1">
                  <a
                    href={`mailto:${personal.email}`}
                    className="font-medium text-white transition-colors duration-300 break-all"
                    style={{ color: "var(--lime)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    {personal.email}
                  </a>
                </p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-[0.18em]" style={{ color: "rgba(240,240,242,0.38)" }}>Location</span>
                <p className="mt-1 text-sm" style={{ color: "rgba(240,240,242,0.75)" }}>{personal.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="contact-name" className="mb-2 block text-xs uppercase tracking-[0.16em]" style={{ color: "rgba(240,240,242,0.50)" }}>
                  Your Name
                </label>
                <input
                  id="contact-name" name="name" type="text" required
                  value={formData.name} onChange={handleChange}
                  placeholder="Dr. Doom"
                  className={fieldClass}
                  style={{ borderColor: "rgba(132,204,22,0.25)" }}
                  onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--lime)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px rgba(132,204,22,0.10)"; }}
                  onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(132,204,22,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-[0.16em]" style={{ color: "rgba(240,240,242,0.50)" }}>
                  Your Email
                </label>
                <input
                  id="contact-email" name="email" type="email" required
                  value={formData.email} onChange={handleChange}
                  placeholder="drdoom@marvel.com"
                  className={fieldClass}
                  style={{ borderColor: "rgba(132,204,22,0.25)" }}
                  onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--lime)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px rgba(132,204,22,0.10)"; }}
                  onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(132,204,22,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-[0.16em]" style={{ color: "rgba(240,240,242,0.50)" }}>
                  Your Message
                </label>
                <textarea
                  id="contact-message" name="message" required rows={5}
                  value={formData.message} onChange={handleChange}
                  placeholder="Tell me about your project, idea, or opportunity..."
                  className={`${fieldClass} resize-none`}
                  style={{ borderColor: "rgba(132,204,22,0.25)" }}
                  onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--lime)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 2px rgba(132,204,22,0.10)"; }}
                  onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(132,204,22,0.25)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                />
              </div>

              {/* Status */}
              {status === "success" && (
                <div className="flex items-center gap-3 border px-4 py-3 text-xs tracking-wide" style={{ borderColor: "rgba(132,204,22,0.35)", background: "rgba(132,204,22,0.08)", color: "var(--lime)" }}>
                  <CheckCircle2 size={16} className="shrink-0" />
                  <span>Message sent! I&apos;ll get back to you soon.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 border px-4 py-3 text-xs tracking-wide" style={{ borderColor: "rgba(255,68,51,0.35)", background: "rgba(255,68,51,0.08)", color: "var(--coral)" }}>
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errorMessage || "Failed to send. Please try again."}</span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex items-center justify-center gap-3 border px-6 py-3.5 text-xs uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 w-full sm:w-auto"
                style={{ borderColor: "var(--lime)", color: "#f0f0f2", background: "rgba(132,204,22,0.08)" }}
                onMouseEnter={e => { if (status !== "loading") { (e.currentTarget as HTMLElement).style.background = "rgba(132,204,22,0.20)"; } }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(132,204,22,0.08)"; }}
              >
                {status === "loading" ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending...</>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
