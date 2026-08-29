import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 bg-cream">
      <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gold/10 text-[#C9A84C] mb-6">
        <span className="w-10 h-10 flex items-center justify-center">
          <i className="ri-error-warning-line text-3xl" />
        </span>
      </div>
      <h1 className="text-6xl md:text-8xl font-bold font-heading text-[#1A1714]">404</h1>
      <h2 className="text-xl md:text-2xl font-bold font-heading text-[#1A1714] mt-4">
        Page Not Found
      </h2>
      <p className="text-[#4A4540] mt-2 text-center max-w-md text-sm md:text-base">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center px-6 py-3 text-sm font-semibold font-label rounded-sm hover:scale-[1.02] hover:brightness-110 transition-all whitespace-nowrap"
        style={{ backgroundColor: '#C9A84C', color: '#2C2825' }}
      >
        Back to Home
        <span className="w-4 h-4 flex items-center justify-center ml-2">
          <i className="ri-arrow-right-line" />
        </span>
      </Link>
    </div>
  );
}