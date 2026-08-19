'use client';

import { servicesData } from '@/lib/data';
import { motion } from 'framer-motion';
import {
  Heart,
  Briefcase,
  Cake,
  Sparkles,
  Camera,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Heart,
  Briefcase,
  Cake,
  Sparkles,
  Camera,
  UtensilsCrossed,
};

export default function Services() {
  return (
    <section id="services" className="bg-charcoal py-20 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs tracking-[0.3em] text-gold uppercase font-semibold">
            OUR SERVICES
          </span>
          <div className="w-12 h-0.5 bg-gold mx-auto mt-2 mb-4" />
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-ivory">
            Crafting Experiences Across Every Occasion
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {servicesData.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white/[0.03] border border-gold/10 rounded-sm p-6 md:p-8 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/[0.06] hover:shadow-lg hover:shadow-gold/5 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors duration-500">
                  {Icon && <Icon className="text-gold" size={24} />}
                </div>
                <h3 className="font-heading text-xl font-semibold text-ivory mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-ivory/60 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
