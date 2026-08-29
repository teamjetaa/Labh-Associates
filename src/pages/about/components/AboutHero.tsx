export default function AboutHero() {
  return (
    <section
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 50%, #2C2825 100%)',
        backgroundSize: '200% 200%',
        animation: 'heroGradient 15s ease infinite',
      }}
    >
      {/* Subtle decorative arc */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: '600px',
          height: '600px',
          border: '2px solid rgba(201, 168, 76, 0.05)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center py-24">
        <h1
          className="reveal text-[#F2EDE4] font-heading font-bold leading-tight"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          Who We Are
        </h1>
        <p className="reveal text-[#C9A84C] font-body font-normal mt-4 md:mt-5 max-w-xl mx-auto leading-relaxed text-base md:text-lg">
          A legacy of trust in project finance since 2012
        </p>
        <p className="reveal text-[#8C8480] font-body font-normal mt-2 max-w-lg mx-auto leading-relaxed text-sm">
          From Gujarat to Mumbai — over a decade of empowering businesses with tailored financial solutions
        </p>
      </div>
    </section>
  );
}