import { useState, useEffect } from 'react';

const WHATSAPP_NUMBER = '919909906867';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello! I would like to inquire about your financial services.');

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Small delay so it slides in after page load
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed z-[150] flex items-center gap-3 group"
      style={{
        bottom: '24px',
        right: '24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'opacity 400ms cubic-bezier(0.22, 1, 0.36, 1), transform 400ms cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      {/* Label that reveals on hover */}
      <span
        className="text-sm font-semibold font-label text-[#1A1714] bg-white border border-[#E8E0D4] rounded-full px-4 py-2 whitespace-nowrap"
        style={{
          opacity: 0,
          transform: 'translateX(12px)',
          transition: 'opacity 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 250ms cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}
      >
        Chat with us
      </span>

      {/* WhatsApp Icon Button */}
      <span
        className="w-12 h-12 flex items-center justify-center rounded-full cursor-pointer"
        style={{
          backgroundColor: '#C9A84C',
          boxShadow: '0 4px 20px rgba(201, 168, 76, 0.4)',
          transition: 'transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 300ms ease',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLSpanElement).style.transform = 'scale(1.1)';
          (e.currentTarget as HTMLSpanElement).style.boxShadow = '0 6px 28px rgba(201, 168, 76, 0.55)';
          const label = (e.currentTarget.parentElement as HTMLAnchorElement)?.querySelector('span:first-child') as HTMLSpanElement;
          if (label) {
            label.style.opacity = '1';
            label.style.transform = 'translateX(0)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLSpanElement).style.transform = 'scale(1)';
          (e.currentTarget as HTMLSpanElement).style.boxShadow = '0 4px 20px rgba(201, 168, 76, 0.4)';
          const label = (e.currentTarget.parentElement as HTMLAnchorElement)?.querySelector('span:first-child') as HTMLSpanElement;
          if (label) {
            label.style.opacity = '0';
            label.style.transform = 'translateX(12px)';
          }
        }}
      >
        <i className="ri-whatsapp-line text-xl text-[#2C2825]" />
      </span>

      {/* Pulse ring */}
      <span
        className="absolute w-12 h-12 rounded-full pointer-events-none"
        style={{
          right: '0',
          backgroundColor: 'transparent',
          border: '2px solid #C9A84C',
          opacity: visible ? 0.5 : 0,
          animation: 'whatsapp-pulse 2s ease-out infinite',
        }}
      />
    </a>
  );
}