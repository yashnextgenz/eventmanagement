'use client';

import { aboutData, images } from '@/lib/data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 md:py-24 lg:py-28 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Image */}
          <motion.div
            className="relative overflow-hidden rounded-sm border border-gold/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="relative h-[500px] lg:h-[600px]">
              <Image
                src={images.about}
                alt="About Sree Souram Event Management"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right Column — Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            {/* Label */}
            <span className="text-xs tracking-[0.3em] text-gold-dark uppercase font-semibold">
              {aboutData.label}
            </span>

            {/* Gold Line */}
            <div className="w-12 h-0.5 bg-gold mt-2 mb-4" />

            {/* Heading */}
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text leading-tight">
              {aboutData.heading}
            </h2>

            {/* Description */}
            <p className="text-base text-dark-text/70 leading-relaxed mt-6">
              {aboutData.description}
            </p>

            {/* CTA Button */}
            <a
              href={aboutData.cta.href}
              className="inline-flex items-center gap-2 text-gold-dark font-semibold uppercase tracking-wider text-sm hover:gap-3 transition-all duration-300 mt-8"
            >
              {aboutData.cta.label}
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-10 pt-8 border-t border-dark-text/10">
              {aboutData.stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-heading text-3xl md:text-4xl font-bold text-gold">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-dark-text/60 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
