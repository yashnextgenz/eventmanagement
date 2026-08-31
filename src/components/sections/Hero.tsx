'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { heroData, images } from '@/lib/data';

export default function Hero() {
  return (
    <>
  

      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
      >
        {/* Background Image with Slow Zoom */}
        <div className="absolute inset-0 animate-[slowZoom_20s_ease-in-out_infinite]">
          <Image
            src="/hero.png"
            alt="Sree Souram Event Management"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/10 via-[#0B1F3A]/80 to-[#0B1F3A]/60" />

        {/* Main Content */}
        <div className="relative z-10 flex min-h-screen items-center justify-center">
          <div className="max-w-4xl px-6 text-center">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-gold md:text-sm">
                {heroData.eyebrow}
              </p>
            </motion.div>

            {/* Gold Line Separator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mx-auto mb-6 mt-4 h-px w-16 bg-gold" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-heading text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl xl:text-7xl"
            >
              {heroData.heading.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mx-auto mt-6 max-w-2xl text-base text-ivory/80 md:text-lg"
            >
              {heroData.description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-8 flex justify-center gap-4"
            >
              <a
                href={heroData.cta1.href}
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-dark-text transition-all duration-300 hover:bg-gold-light"
              >
                {heroData.cta1.label}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={heroData.cta2.href}
                className="inline-flex items-center px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-ivory transition-all duration-300 border border-ivory/40 hover:border-gold hover:text-gold"
              >
                {heroData.cta2.label}
              </a>
            </motion.div>
          </div>
        </div>

        {/* Bottom Categories Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black/80 to-transparent py-6"
        >
          <div className="flex items-center gap-6">
            {heroData.categories.map((category, index) => (
              <span key={index} className="flex items-center gap-6">
                <a
                  href="#services"
                  className="text-xs uppercase tracking-wider text-ivory/60 transition-colors hover:text-gold md:text-sm"
                >
                  {category}
                </a>
                {index < heroData.categories.length - 1 && (
                  <span className="h-4 w-px bg-gold/30" />
                )}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
