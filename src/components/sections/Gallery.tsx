'use client';

import { images } from '@/lib/data';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

const gridClasses: string[] = [
  'sm:col-span-2 sm:row-span-2', // 0: large featured
  '',                                // 1: normal
  '',                                // 2: normal
  'sm:row-span-2',                  // 3: tall
  '',                                // 4: normal
  '',                                // 5: normal
  'sm:col-span-2',                  // 6: wide
  '',                                // 7: normal
];

const aspectClasses: string[] = [
  'min-h-[300px] sm:min-h-[400px]', // 0: large featured
  'aspect-square',                   // 1
  'aspect-square',                   // 2
  'min-h-[300px] sm:min-h-[400px]', // 3: tall
  'aspect-square',                   // 4
  'aspect-square',                   // 5
  'aspect-video sm:aspect-[2/1]',   // 6: wide
  'aspect-square',                   // 7
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.gallery.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.gallery.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

  const currentItem = images.gallery[currentIndex];

  return (
    <section id="gallery" className="py-20 md:py-24 lg:py-28 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-[0.3em] text-gold uppercase font-semibold"
          >
            OUR RECENT WORK
          </motion.span>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-2 mb-4" />
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ivory"
          >
            Moments We&apos;ve Brought To Life
          </motion.h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {images.gallery.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${gridClasses[index]}`}
              onClick={() => openLightbox(index)}
            >
              <div className={`relative w-full ${aspectClasses[index]}`}>
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Dark overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500" />

              {/* Text on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="text-xs uppercase tracking-[0.2em] text-gold">
                  {item.category}
                </span>
                <span className="font-heading text-lg text-white mt-1">
                  {item.title}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Gallery Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="#gallery"
            className="inline-flex items-center gap-2 text-gold border border-gold/30 px-8 py-3 text-sm uppercase tracking-wider hover:bg-gold hover:text-dark-text transition-all duration-300 rounded-sm"
          >
            VIEW ALL GALLERY
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && currentItem && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/70 hover:text-white transition-colors duration-200"
            aria-label="Close lightbox"
          >
            <X size={28} />
          </button>

          {/* Previous button */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory/10 transition-all duration-200"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory/10 transition-all duration-200"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>

          {/* Image display */}
          <div className="max-w-5xl w-full mx-4">
            <div className="relative w-full aspect-video rounded-sm overflow-hidden">
              <Image
                src={currentItem.src}
                alt={currentItem.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>

            {/* Caption */}
            <div className="text-center mt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">
                {currentItem.category}
              </p>
              <p className="font-heading text-lg text-ivory/80 mt-1">
                {currentItem.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
