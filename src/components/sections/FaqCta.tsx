'use client';

import { faqData, images } from '@/lib/data';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function FaqCta() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* LEFT COLUMN — FAQ Accordion */}
          <div>
            <p className="text-xs tracking-[0.3em] text-gold uppercase font-semibold">
              FREQUENTLY ASKED QUESTIONS
            </p>
            <div className="w-12 h-0.5 bg-gold mt-2 mb-6" />

            <div>
              {faqData.map((item, index) => (
                <div
                  key={index}
                  className={index < faqData.length - 1 ? 'border-b border-ivory/10' : ''}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
                  >
                    <span className="text-base font-medium text-ivory group-hover:text-gold transition-colors duration-300">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gold/60 transition-transform duration-300 flex-shrink-0 ml-4 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm text-ivory/60 leading-relaxed pb-5">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — CTA */}
          <div className="relative overflow-hidden rounded-sm min-h-[500px] flex items-center justify-center">
            <Image
              src={images.cta}
              alt="Plan your event"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 text-center px-8">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                Let’s Create Something Unforgettable.
              </h2>
              <div className="w-12 h-0.5 bg-gold mx-auto mt-4 mb-4" />
              <p className="text-sm text-ivory/80">
                Tell us about your event and let&apos;s bring your vision to life.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-dark-text px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:bg-gold-light transition-all duration-300"
                >
                  PLAN MY EVENT
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2 border border-ivory/40 text-ivory px-8 py-3.5 text-sm font-semibold uppercase tracking-wider hover:border-gold hover:text-gold transition-all duration-300"
                >
                  WHATSAPP US
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
