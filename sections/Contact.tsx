"use client";

import { motion } from "framer-motion";
import { Check, Copy, Download, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import MagneticButton from "@/components/motion/MagneticButton";
import { CONTACT, SITE, SOCIALS } from "@/constants/content";
import { tokenizeSegments } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

function StatementWords() {
  const words = tokenizeSegments(CONTACT.statement);

  return (
    <motion.p
      className="text-4xl sm:text-6xl lg:text-7xl 2xl:text-8xl font-thin lg:leading-[5rem] 2xl:leading-[6rem] 2xl:tracking-tighter text-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      transition={{ staggerChildren: 0.035 }}
    >
      {words.map((token, i) => (
        <motion.span
          key={i}
          className={`inline-block ${token.bold ? "font-medium" : ""}`}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          {token.word}&nbsp;
        </motion.span>
      ))}
    </motion.p>
  );
}

/** Bright-blue closing section: pitch, resume, email, socials, and the black baseline bar. */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link still works.
    }
  };

  return (
    <footer id="contact" className="bg-tech-medium/90 relative">
      <section className="px-4 py-4 md:py-10 md:px-6 2xl:px-10 min-h-screen flex place-content-center pb-24">
        <div className="my-auto 2xl:px-32">
          <StatementWords />

          <motion.div
            className="mt-10 lg:w-3/4 2xl:w-1/2"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
          >
            <p className="text-base font-light mt-6 sm:text-lg xl:text-xl text-black mb-4">
              {CONTACT.blurb.map((segment, i) =>
                segment.bold ? (
                  <strong key={i} className="font-medium">
                    {segment.text}
                  </strong>
                ) : (
                  <span key={i}>{segment.text}</span>
                ),
              )}
            </p>

            {/* Resume */}
            <a
              href={SITE.resumeUrl}
              download
              className="group mt-8 flex w-fit flex-row place-items-center gap-4 text-black"
            >
              <Download aria-hidden className="h-6 w-6 transition-transform duration-300 group-hover:translate-y-0.5" />
              <span className="relative text-sm sm:text-xl xl:text-2xl">
                Download Resume
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </span>
            </a>

            {/* Email (mailto + copy) */}
            <div className="mt-3 flex flex-row place-items-center gap-4 text-black">
              <Mail aria-hidden className="h-6 w-6" />
              <a
                href={`mailto:${SITE.email}`}
                className="group relative text-sm sm:text-xl xl:text-2xl"
              >
                {SITE.email}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-black transition-transform duration-300 ease-out group-hover:scale-x-100" />
              </a>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={copied ? "Email copied" : "Copy email address"}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-black/30 transition-colors duration-300 hover:bg-black hover:text-tech-medium"
              >
                {copied ? (
                  <Check aria-hidden className="h-4 w-4" />
                ) : (
                  <Copy aria-hidden className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Location */}
            <div className="mt-3 flex flex-row place-items-center gap-4 text-black">
              <MapPin aria-hidden className="h-6 w-6" />
              <span className="text-sm sm:text-xl xl:text-2xl">
                {SITE.location} · open to remote and on-site
              </span>
            </div>

            {/* Socials */}
            <ul className="mt-8 flex gap-4" aria-label="Social profiles">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <MagneticButton strength={0.5}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-12 w-12 items-center justify-center rounded-full border border-black/40 text-black transition-colors duration-300 hover:bg-black hover:text-tech-medium"
                    >
                      <social.icon aria-hidden className="h-5 w-5" />
                    </a>
                  </MagneticButton>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Baseline bar */}
      <div className="absolute bottom-0 w-full py-4 px-4 2xl:px-10 flex flex-wrap gap-x-4 gap-y-1 place-items-center place-content-between font-extralight text-xs xl:text-sm uppercase bg-black text-slate-200">
        <p>
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
        <div className="flex gap-4">
          {SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 hover:text-tech-light"
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
