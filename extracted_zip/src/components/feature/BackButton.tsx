import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
  tone?: 'light' | 'dark';
  className?: string;
}

/*
 * BackButton
 * Shared "go back" control used across inner pages. Returns the user to
 * the page they came from, and safely falls back to the homepage when
 * there is no in-app history to go back to (e.g. a direct visit/link).
 */
export default function BackButton({ label = 'Back', tone = 'light', className = '' }: BackButtonProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === 'number' && historyIndex > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const toneClasses =
    tone === 'light'
      ? 'text-[#F2EDE4]/70 border-[#C9A84C]/25 hover:text-[#C9A84C] hover:border-[#C9A84C]/50'
      : 'text-[#4A4540] border-[#C9A84C]/30 hover:text-[#C9A84C] hover:border-[#C9A84C]/60';

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back to the previous page"
      className={`group inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-label uppercase tracking-[0.1em] transition-colors cursor-pointer whitespace-nowrap ${toneClasses} ${className}`}
    >
      <span className="w-4 h-4 flex items-center justify-center transition-transform duration-200 group-hover:-translate-x-0.5">
        <i className="ri-arrow-left-line" />
      </span>
      {label}
    </button>
  );
}