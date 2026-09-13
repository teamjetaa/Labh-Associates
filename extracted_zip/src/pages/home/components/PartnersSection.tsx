/* ===== GROWTH PARTNERS =====
 * Dual infinite marquee with 3D interactive cards
 */

import { useRef, useCallback } from 'react';

const partners = [
  {
    name: 'State Bank of India',
    short: 'SBI',
    category: 'Public Sector Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/SBI-logo.svg/500px-SBI-logo.svg.png',
  },
  {
    name: 'HDFC Bank',
    short: 'HDFC',
    category: 'Private Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/HDFC-Bank-Logo.svg/960px-HDFC-Bank-Logo.svg.png',
  },
  {
    name: 'ICICI Bank',
    short: 'ICICI',
    category: 'Private Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/960px-ICICI_Bank_Logo.svg.png',
  },
  {
    name: 'Axis Bank',
    short: 'Axis',
    category: 'Private Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/AXISBank_Logo.svg/960px-AXISBank_Logo.svg.png',
  },
  {
    name: 'Bank of Baroda',
    short: 'BoB',
    category: 'Public Sector Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Bank_of_Baroda_Logo_since_Dec_19.png/960px-Bank_of_Baroda_Logo_since_Dec_19.png',
  },
  {
    name: 'Canara Bank',
    short: 'Canara',
    category: 'Public Sector Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Canara_Bank_Logo.svg/960px-Canara_Bank_Logo.svg.png',
  },
  {
    name: 'Yes Bank',
    short: 'Yes',
    category: 'Private Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Yes_Bank_SVG_Logo.svg/960px-Yes_Bank_SVG_Logo.svg.png',
  },
  {
    name: 'Punjab National Bank',
    short: 'PNB',
    category: 'Public Sector Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Punjab_National_Bank_new_logo.svg/960px-Punjab_National_Bank_new_logo.svg.png',
  },
  {
    name: 'Union Bank of India',
    short: 'UBI',
    category: 'Public Sector Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Union_Bank_of_India_Logo.svg/960px-Union_Bank_of_India_Logo.svg.png',
  },
  {
    name: 'IDFC First Bank',
    short: 'IDFC',
    category: 'Private Bank',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Logo_of_IDFC_First_Bank.svg/960px-Logo_of_IDFC_First_Bank.svg.png',
  },
  {
    name: 'Kotak Mahindra Bank',
    short: 'Kotak',
    category: 'Private Bank',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/f62b39b3-9c44-4203-aa37-500de357031f_compressed_kotak-mahindra-bank-logo-png_seeklogo-304220-removebg-preview.webp',
  },
  {
    name: 'Hero FinCorp',
    short: 'Hero',
    category: 'NBFC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Hero_FinCorp_Logo_New_Final_2013_Vertical_Wiki.png/960px-Hero_FinCorp_Logo_New_Final_2013_Vertical_Wiki.png',
  },
  {
    name: 'Bajaj Finserv',
    short: 'Bajaj',
    category: 'NBFC',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/e4a271ec-d114-4871-a1ad-36b3a209102f_compressed_bajaj-finserv-logo-png_seeklogo-525141.webp',
  },
  {
    name: 'Central Bank of India',
    short: 'CBI',
    category: 'Public Sector Bank',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/9e745976-476f-4a74-b532-81dde29840f9_compressed_CENTRALBK.NS_BIG.webp',
  },
  {
    name: 'Kalupur Commercial Co-op Bank',
    short: 'Kalupur',
    category: 'Co-operative Bank',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/525d702a-0e05-44ad-bd11-3a1d70b9a63d_compressed_The-Kalupur-Commercial-Co---Operative-Bank-Ltd.webp',
  },
  {
    name: 'Saraswat Cooperative Bank',
    short: 'Saraswat',
    category: 'Co-operative Bank',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/1644400c-2c13-45b7-bfc0-63e60b35e371_compressed_saraswat-bank-logo-png_seeklogo-185331-removebg-preview.webp',
  },
  {
    name: 'Aditya Birla Capital',
    short: 'Aditya Birla',
    category: 'NBFC',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/7e52b21e-c43c-4b1d-9557-965229c1b0e1_compressed_aditya-birla-capital-logo.webp',
  },
  {
    name: 'Indiabulls Home Loans',
    short: 'Indiabulls',
    category: 'Housing Finance',
    logo: 'https://storage.helloreaddy.io/project_files/95da97ad-f20f-489f-8fde-b7b7061e2c9b/cdd1fbf4-8f7d-4e95-af99-1fc5ecb9bc51_compressed_indiabulls-home-loans-logo-png_seeklogo-530536.webp',
  },
];

const row1 = partners.slice(0, 9);
const row2 = partners.slice(9);

interface PartnerCardProps {
  p: (typeof partners)[0];
}

function PartnerCard({ p }: PartnerCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -12;
    const ry = ((x - cx) / cx) * 12;
    card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.08) translateZ(50px)`;
    card.style.borderColor = 'rgba(201,168,76,0.5)';
    card.style.boxShadow = '0 0 0 1px rgba(201,168,76,0.15), 0 25px 50px rgba(0,0,0,0.35)';
    card.style.zIndex = '20';
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0)';
    card.style.borderColor = 'rgba(242,237,228,0.08)';
    card.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    card.style.zIndex = '1';
  }, []);

  return (
    <div className="flex-shrink-0 w-[152px] md:w-[180px]">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative flex flex-col items-center overflow-hidden cursor-pointer rounded-xl"
        style={{
          background: 'linear-gradient(145deg, rgba(242,237,228,0.06) 0%, rgba(242,237,228,0.02) 100%)',
          border: '1px solid rgba(242,237,228,0.08)',
          transition: 'transform 0.12s ease-out, box-shadow 0.25s ease, border-color 0.25s ease, z-index 0s',
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Top gold accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px] opacity-60"
          style={{ backgroundColor: '#C9A84C' }}
        />

        {/* Logo area */}
        <div className="flex items-center justify-center px-4 py-5 md:py-6 min-h-[72px] md:min-h-[84px] w-full">
          <img
            src={p.logo}
            alt={p.name}
            className="max-w-full max-h-full object-contain"
            style={{ maxWidth: '96px', maxHeight: '40px' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.logo-fallback') as HTMLElement;
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <span
            className="logo-fallback font-heading font-bold text-[17px] md:text-[20px] tracking-tight hidden"
            style={{ color: '#C9A84C' }}
          >
            {p.short}
          </span>
        </div>

        {/* Info area */}
        <div className="px-3 py-3 text-center w-full" style={{ borderTop: '1px solid rgba(242,237,228,0.05)' }}>
          <h3 className="font-label font-semibold text-[10px] md:text-[11px] text-[#F2EDE4]/80 leading-tight line-clamp-2">
            {p.name}
          </h3>
          <span className="inline-block font-label text-[9px] md:text-[10px] text-[#F2EDE4]/40 mt-1.5 px-2.5 py-0.5 rounded-full"
            style={{ background: 'rgba(201,168,76,0.08)' }}
          >
            {p.category}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section
      className="py-20 md:py-28 overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 50%, #2C2825 100%)',
        backgroundSize: '200% 200%',
        animation: 'heroGradient 18s ease infinite',
      }}
    >
      <style>{`
        @keyframes heroGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .track-left {
          animation: marquee-left 35s linear infinite;
          will-change: transform;
        }
        .track-right {
          animation: marquee-right 35s linear infinite;
          will-change: transform;
        }
        .marquee-wrapper:hover .track-left,
        .marquee-wrapper:hover .track-right {
          animation-play-state: paused;
        }
      `}</style>

      {/* Faint gold decorative circle */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          border: '1px solid rgba(201, 168, 76, 0.05)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            className="reveal font-heading font-bold text-[#F2EDE4] leading-tight"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
          >
            Our Growth Partners
          </h2>
          <div
            className="reveal mx-auto mt-4"
            style={{ width: '48px', height: '2px', backgroundColor: '#C9A84C' }}
          />
          <p className="reveal font-body text-[#F2EDE4]/60 text-[15px] md:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Trusted associations with leading banks, NBFCs, and housing finance companies across India
          </p>
        </div>
      </div>

      {/* Dual Marquee */}
      <div className="marquee-wrapper relative w-full">
        {/* Row 1 — scrolls left */}
        <div className="relative overflow-hidden py-3">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #2C2825, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #2C2825, transparent)' }}
          />
          <div className="track-left flex items-stretch gap-4 md:gap-5 px-2">
            {row1.map((p, i) => (
              <PartnerCard key={`r1-a-${i}-${p.short}`} p={p} />
            ))}
            {row1.map((p, i) => (
              <PartnerCard key={`r1-b-${i}-${p.short}`} p={p} />
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="relative overflow-hidden py-3">
          <div
            className="absolute left-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #2C2825, transparent)' }}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-16 md:w-32 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to left, #2C2825, transparent)' }}
          />
          <div className="track-right flex items-stretch gap-4 md:gap-5 px-2">
            {row2.map((p, i) => (
              <PartnerCard key={`r2-a-${i}-${p.short}`} p={p} />
            ))}
            {row2.map((p, i) => (
              <PartnerCard key={`r2-b-${i}-${p.short}`} p={p} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <p className="reveal text-center font-label text-[13px] text-[#F2EDE4]/40 mt-10 md:mt-12">
          And many more financial institutions supporting your growth journey
        </p>
      </div>
    </section>
  );
}