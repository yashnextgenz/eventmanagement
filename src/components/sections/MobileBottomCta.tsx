'use client';

import { MessageCircle, Phone } from 'lucide-react';
import { contactInfo } from '@/lib/data';

export default function MobileBottomCta() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-charcoal border-t border-gold/20 px-4 py-3">
      <div className="flex gap-3">
        <a
          href={contactInfo.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-sm text-sm font-semibold uppercase tracking-wider"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <a
          href={`tel:${contactInfo.phone}`}
          className="flex-1 flex items-center justify-center gap-2 bg-gold text-dark-text py-3 rounded-sm text-sm font-semibold uppercase tracking-wider"
        >
          <Phone size={18} />
          Call
        </a>
      </div>
    </div>
  );
}
