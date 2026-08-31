'use client';

import { testimonialsData } from '@/lib/data';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = testimonialsData.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play: advance every 5 seconds, pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section id="testimonials" className="py-20 md:py-24 lg:py-28 bg-[#0B1F3A] relative">
      {/* Subtle decorative element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gold/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-t from-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-[0.3em] text-gold uppercase font-semibold">
            WHAT OUR CLIENTS SAY
          </p>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-2 mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ivory">
            Words That Warm Our Hearts
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div
          className="relative mt-12 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Inner Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-4">
                <div className="max-w-3xl mx-auto bg-white/[0.03] border border-gold/10 rounded-sm p-8 md:p-10 text-center">
                  {/* Quote Icon */}
                  <Quote className="mx-auto mb-6 text-gold/30" size={40} />

                  {/* Testimonial Text */}
                  <p className="text-ivory/80 text-base md:text-lg leading-relaxed italic">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Stars */}
                  <div className="flex justify-center gap-1 mt-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="text-gold"
                        size={18}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  {/* Client Name */}
                  <p className="font-heading text-lg text-gold font-semibold mt-4">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-4 left-0 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-dark-text transition-all duration-300 cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute top-1/2 -translate-y-1/2 translate-x-4 right-0 w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-dark-text transition-all duration-300 cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonialsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 ${
                index === current
                  ? 'bg-gold w-8'
                  : 'bg-gold/30 w-2.5 hover:bg-gold/60'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
