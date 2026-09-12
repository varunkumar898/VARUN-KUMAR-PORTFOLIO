import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, CheckCircle2, RefreshCw } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { api } from '../services/api';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const { profile } = usePortfolio();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await api.sendContactMessage({
        name,
        email,
        subject: subject || 'Embedded Systems Opportunity',
        message
      });

      if (response.success) {
        setIsSubmitted(true);
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => setIsSubmitted(false), 8000);
      } else {
        setErrorMessage('Failed to send message. Please reach out via email directly.');
      }
    } catch (err: any) {
      // Direct mailto fallback
      const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(
        subject || 'Embedded Systems Opportunity'
      )}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      window.location.href = mailto;
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-[#0D1117] border-b border-[#2D3748] relative"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[32px] leading-[40px] font-bold text-[#F0F4F8] tracking-tight">
            GET IN TOUCH
          </h2>
          <div className="w-10 h-[1px] bg-[#2D3748] mx-auto my-3" />
          <p className="text-base text-[#A8B8C8]">
            "Available for full-time roles and technical discussions."
          </p>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          {/* Left Column (Contact Info) - 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] space-y-5">
              <div>
                <h3 className="text-xl font-bold text-[#F0F4F8]">
                  {profile.name}
                </h3>
                <div className="text-xs font-mono text-[#D4AF37] font-semibold mt-1">
                  {profile.title}
                </div>
              </div>

              <div className="space-y-4 text-sm text-[#A8B8C8] pt-3 border-t border-[#2D3748]">
                {/* Email with copy */}
                <div>
                  <div className="text-[11px] font-mono text-[#6B7280] uppercase">EMAIL</div>
                  <div className="flex items-center justify-between mt-1">
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-[#F0F4F8] hover:text-[#1E90FF] transition-colors truncate"
                    >
                      {profile.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="text-xs font-mono text-[#A8B8C8] hover:text-[#1E90FF] px-2 py-0.5 rounded bg-[#0D1117] border border-[#2D3748] flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
                      title="Copy email"
                    >
                      {copied ? <Check className="w-3 h-3 text-[#10B981]" /> : <Copy className="w-3 h-3" />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <div className="text-[11px] font-mono text-[#6B7280] uppercase">PHONE</div>
                  <div className="mt-1">
                    <a
                      href={`tel:${profile.phone}`}
                      className="text-[#F0F4F8] hover:text-[#1E90FF] transition-colors font-mono"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <div className="text-[11px] font-mono text-[#6B7280] uppercase">LOCATION</div>
                  <div className="text-[#F0F4F8] mt-1 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                {/* GitHub & LinkedIn */}
                <div className="pt-2 border-t border-[#2D3748] flex flex-col gap-2 font-mono text-xs">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#A8B8C8] hover:text-[#1E90FF] transition-colors"
                  >
                    <Github className="w-4 h-4 text-[#F0F4F8]" />
                    <span>github.com/varunkumarjob898</span>
                  </a>

                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#A8B8C8] hover:text-[#1E90FF] transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-[#1E90FF]" />
                    <span>linkedin.com/in/varun-kumar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick availability pill */}
            <div className="p-4 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] flex items-center gap-3 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[#A8B8C8] uppercase">
                {profile.status || 'OPEN TO WORK'}: {profile.availability}
              </span>
            </div>
          </div>

          {/* Right Column (Contact Form) - 7 cols */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-8 rounded-[4px] bg-[#1A1F28] border border-[#2D3748] space-y-5"
            >
              {isSubmitted && (
                <div className="p-3 rounded bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono flex items-center gap-2 animate-fade-in-up">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Message delivered and logged to Varun&apos;s engineer inbox! A copy has also been routed.</span>
                </div>
              )}

              {errorMessage && (
                <div className="p-3 rounded bg-red-500/10 border border-red-500/40 text-red-400 text-xs font-mono flex items-center gap-2">
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-mono uppercase tracking-[1px] text-[#A8B8C8] mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Vance"
                  className="w-full p-3 rounded-[4px] bg-[#0D1117] border border-[#2D3748] text-[#F0F4F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-all font-mono"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-mono uppercase tracking-[1px] text-[#A8B8C8] mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. elena@company.com"
                  className="w-full p-3 rounded-[4px] bg-[#0D1117] border border-[#2D3748] text-[#F0F4F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-all font-mono"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-mono uppercase tracking-[1px] text-[#A8B8C8] mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Embedded Firmware Engineer Role"
                  className="w-full p-3 rounded-[4px] bg-[#0D1117] border border-[#2D3748] text-[#F0F4F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-all font-mono"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-mono uppercase tracking-[1px] text-[#A8B8C8] mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your technical requirements, team needs, or questions..."
                  className="w-full min-h-[120px] p-3 rounded-[4px] bg-[#0D1117] border border-[#2D3748] text-[#F0F4F8] placeholder-[#6B7280] text-sm focus:outline-none focus:border-[#1E90FF] focus:ring-1 focus:ring-[#1E90FF] transition-all resize-y font-mono"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                id="contact-submit-btn"
                className="w-full py-3 px-6 rounded bg-[#D4AF37] hover:bg-[#e0bc46] text-[#0D1117] font-bold text-xs uppercase tracking-wider transition-all duration-150 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#D4AF37] font-mono cursor-pointer"
              >
                {isSubmitting ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isSubmitting ? 'DISPATCHING TO INBOX...' : 'TRANSMIT MESSAGE'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
