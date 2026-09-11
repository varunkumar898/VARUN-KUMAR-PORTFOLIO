import React, { useState } from 'react';
import { PROFILE } from '../data/portfolioData';
import { Mail, Phone, MapPin, Github, Linkedin, FileText, Send, Copy, Check, Terminal } from 'lucide-react';

interface ContactSectionProps {
  onOpenResumeModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResumeModal }) => {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const mailtoLink = `mailto:${PROFILE.email}?subject=${encodeURIComponent(
    subject || 'Embedded / Firmware Opportunity'
  )}&body=${encodeURIComponent(
    `From: ${senderName} (${senderEmail})\n\n${message}`
  )}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#0B0D0F] border-b border-[#25292D] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 border-b border-[#25292D] pb-5 gap-4">
          <div>
            <div className="text-xs font-mono text-[#C8FF00] tracking-widest uppercase mb-1">
              // SECTION 09
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-[#E8EAED] tracking-tight uppercase">
              LET'S BUILD SOMETHING CLOSE TO THE HARDWARE.
            </h2>
            <div className="text-sm font-mono text-[#9AA0A6] mt-1">
              "Interested in embedded systems, firmware development or hardware-software integration?"
            </div>
          </div>
          <div className="text-xs font-mono text-[#9AA0A6] bg-[#111417] px-3 py-1.5 rounded border border-[#25292D] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]"></span>
            <span>OPEN FOR DIRECT CONTACT</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded bg-[#111417] border border-[#25292D] space-y-4">
              <div>
                <h3 className="text-xl font-mono font-bold text-[#E8EAED]">
                  {PROFILE.name}
                </h3>
                <div className="text-xs font-mono text-[#C8FF00] font-semibold mt-0.5">
                  {PROFILE.title}
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs text-[#9AA0A6] pt-2 border-t border-[#25292D]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#C8FF00] shrink-0" />
                  <span>{PROFILE.location}</span>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={`tel:${PROFILE.phone}`}
                    id="contact-phone-link"
                    className="flex items-center gap-3 text-[#E8EAED] hover:text-[#C8FF00] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[#C8FF00] shrink-0" />
                    <span>{PROFILE.phone}</span>
                  </a>
                  <span className="text-[10px] text-[#9AA0A6]">DIRECT CALL</span>
                </div>

                <div className="flex items-center justify-between">
                  <a
                    href={`mailto:${PROFILE.email}`}
                    id="contact-email-link"
                    className="flex items-center gap-3 text-[#E8EAED] hover:text-[#C8FF00] transition-colors truncate"
                  >
                    <Mail className="w-4 h-4 text-[#C8FF00] shrink-0" />
                    <span className="truncate">{PROFILE.email}</span>
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="text-[10px] text-[#9AA0A6] hover:text-[#C8FF00] px-1.5 py-0.5 rounded border border-[#25292D] bg-[#0B0D0F]"
                    title="Copy email"
                  >
                    {copied ? 'COPIED' : 'COPY'}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Matrix Buttons */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <a
                href={`mailto:${PROFILE.email}`}
                id="contact-btn-email"
                className="p-3 rounded bg-[#C8FF00] text-[#0B0D0F] font-bold tracking-wider uppercase hover:bg-[#d5ff33] transition-colors flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>EMAIL ME</span>
              </a>

              <a
                href={`tel:${PROFILE.phone}`}
                id="contact-btn-phone"
                className="p-3 rounded bg-[#111417] text-[#E8EAED] border border-[#25292D] hover:border-[#C8FF00] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>CALL DIRECT</span>
              </a>

              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-btn-github"
                className="p-3 rounded bg-[#111417] text-[#E8EAED] border border-[#25292D] hover:border-[#C8FF00] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Github className="w-4 h-4" />
                <span>GITHUB</span>
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                id="contact-btn-linkedin"
                className="p-3 rounded bg-[#111417] text-[#E8EAED] border border-[#25292D] hover:border-[#C8FF00] font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>
            </div>

            <button
              onClick={onOpenResumeModal}
              className="w-full p-3 rounded bg-[#161A1F] border border-[#25292D] hover:border-[#C8FF00] text-[#E8EAED] hover:text-[#C8FF00] font-mono text-xs font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#C8FF00]" />
              <span>DOWNLOAD OR VIEW RESUME</span>
            </button>
          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7 p-6 rounded bg-[#111417] border border-[#25292D] space-y-4">
            <div className="flex items-center justify-between border-b border-[#25292D] pb-3 font-mono text-xs">
              <span className="text-[#C8FF00] font-bold">// TRANSMISSION DISPATCH CONSOLE</span>
              <span className="text-[#9AA0A6] text-[10px]">MAILTO CLIENT BRIDGE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div>
                <label className="block text-[#9AA0A6] mb-1 text-[11px]">YOUR NAME</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Engineering Manager"
                  className="w-full bg-[#0B0D0F] border border-[#25292D] rounded p-2 text-[#E8EAED] placeholder-[#9AA0A6] focus:outline-none focus:border-[#C8FF00]"
                />
              </div>

              <div>
                <label className="block text-[#9AA0A6] mb-1 text-[11px]">YOUR EMAIL / ORG</label>
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="e.g. hiring@robotics-firm.com"
                  className="w-full bg-[#0B0D0F] border border-[#25292D] rounded p-2 text-[#E8EAED] placeholder-[#9AA0A6] focus:outline-none focus:border-[#C8FF00]"
                />
              </div>
            </div>

            <div className="font-mono text-xs">
              <label className="block text-[#9AA0A6] mb-1 text-[11px]">SUBJECT</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Embedded Systems Engineer / Firmware Role"
                className="w-full bg-[#0B0D0F] border border-[#25292D] rounded p-2 text-[#E8EAED] placeholder-[#9AA0A6] focus:outline-none focus:border-[#C8FF00]"
              />
            </div>

            <div className="font-mono text-xs">
              <label className="block text-[#9AA0A6] mb-1 text-[11px]">MESSAGE / TECHNICAL INQUIRY</label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your hardware project, target architecture, or role requirements..."
                className="w-full bg-[#0B0D0F] border border-[#25292D] rounded p-2 text-[#E8EAED] placeholder-[#9AA0A6] focus:outline-none focus:border-[#C8FF00] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
              <span className="text-[11px] text-[#9AA0A6]">
                Transmits directly to: <span className="text-[#E8EAED]">{PROFILE.email}</span>
              </span>

              <a
                href={mailtoLink}
                id="send-message-mailto-btn"
                className="px-5 py-2.5 rounded bg-[#C8FF00] text-[#0B0D0F] font-bold tracking-wider uppercase hover:bg-[#d5ff33] transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>LAUNCH EMAIL CLIENT</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
