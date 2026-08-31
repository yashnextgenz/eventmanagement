'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { navLinks } from '@/lib/data';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // --- Scroll tracking ---
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- IntersectionObserver for active section ---
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: '-40% 0px -55% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // --- Lock body scroll when mobile menu is open ---
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50 w-full transition-all duration-500 ease-in-out
          ${
            scrolled
              ? 'bg-[#0B1F3A] border-b border-[#C9A227]/30 shadow-lg shadow-black/20'
              : 'bg-[#0B1F3A]'
          }
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          {/* ---- Brand ---- */}
     <a href="#home" className="flex items-center">
  <img
    src="/logo.jpeg"
    alt="Sree Souram Event Management"
    className="h-12 w-auto object-contain md:h-14"
  />
</a>

          {/* ---- Desktop Nav Links ---- */}
          <ul className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <li key={sectionId}>
                  <a
                    href={link.href}
                    className={`
                      font-body text-sm uppercase tracking-wider transition-colors duration-300
                      ${
                        isActive
                          ? 'text-gold'
                          : 'text-ivory/80 hover:text-gold'
                      }
                    `}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* ---- Right: WhatsApp Button (desktop) + Hamburger ---- */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/91XXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded bg-gold px-4 py-2 font-body text-xs font-semibold uppercase tracking-wider text-dark-text transition-transform duration-300 hover:scale-105 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>

            {/* Hamburger (mobile only) */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded p-2 text-ivory/80 transition-colors hover:text-gold md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ---- Mobile Full-Screen Overlay ---- */}
      <div
        className={`
          fixed inset-0 z-40 flex flex-col items-center justify-center bg-charcoal/98 backdrop-blur-sm
          transition-all duration-500 ease-in-out md:hidden
          ${
            mobileOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          }
        `}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link) => {
            const sectionId = link.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={sectionId}
                href={link.href}
                onClick={closeMobile}
                className={`
                  font-heading text-2xl font-semibold tracking-wider transition-colors duration-300
                  ${
                    isActive
                      ? 'text-gold'
                      : 'text-ivory/80 hover:text-gold'
                  }
                `}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* WhatsApp button at bottom of mobile menu */}
        <div className="mt-12">
          <a
            href="https://wa.me/91XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMobile}
            className="inline-flex items-center gap-2 rounded bg-gold px-6 py-3 font-body text-sm font-semibold uppercase tracking-wider text-dark-text transition-transform duration-300 hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Us
          </a>
        </div>
      </div>
    </>
  );
}
