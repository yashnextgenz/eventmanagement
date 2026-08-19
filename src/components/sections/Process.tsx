'use client';

import { processSteps } from '@/lib/data';
import { motion } from 'framer-motion';

export default function Process() {
  return (
    <section id="process" className="section-padding bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-gold-dark uppercase font-semibold"
          >
            OUR EVENT PLANNING PROCESS
          </motion.span>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-2 mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-dark-text"
          >
            How We Bring Your Vision To Life
          </motion.h2>
        </div>

        {/* Steps — Desktop Layout */}
        <div className="hidden lg:flex items-start justify-between gap-4 relative mt-16">
          {/* Connecting horizontal line */}
          <div className="absolute top-8 left-[10%] right-[10%] h-px bg-gold/20" />

          {processSteps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="flex flex-col items-center text-center relative flex-1"
            >
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center font-heading text-xl font-bold text-gold bg-ivory relative z-10">
                {step.number}
              </div>
              <h3 className="font-heading text-lg font-semibold text-dark-text mt-4">
                {step.title}
              </h3>
              <p className="text-sm text-dark-text/60 mt-2 max-w-[200px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Steps — Mobile Layout */}
        <div className="flex lg:hidden flex-col gap-8 mt-12">
          {processSteps.map((step, index) => (
            <div key={step.number}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center font-heading text-xl font-bold text-gold bg-ivory relative z-10">
                  {step.number}
                </div>
                <h3 className="font-heading text-lg font-semibold text-dark-text mt-4">
                  {step.title}
                </h3>
                <p className="text-sm text-dark-text/60 mt-2 max-w-[200px]">
                  {step.description}
                </p>
              </motion.div>

              {/* Vertical connecting line between steps (not after last) */}
              {index < processSteps.length - 1 && (
                <div className="h-8 w-px bg-gold/20 mx-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
