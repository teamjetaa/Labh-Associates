import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  ariaLabel?: string;
}

/**
 * Accessible, fully theme-controlled dropdown.
 * Native <select> lists are drawn by the OS (grey system highlight),
 * so this component replaces them with palette-matched styling.
 */
export default function CustomSelect({
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
  ariaLabel,
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((opt) => opt.value === value);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) {
      const idx = options.findIndex((opt) => opt.value === value);
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  }, [open, value, options]);

  useEffect(() => {
    if (!open || activeIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, open]);

  const commit = (val: string) => {
    onChange(val);
    setOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0 && options[activeIndex]) commit(options[activeIndex].value);
        break;
      default:
        break;
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        id={id}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between gap-2 px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm text-left bg-white transition-colors hover:border-[#C9A84C] focus:border-[#C9A84C]"
      >
        <span className={`truncate ${selected ? 'text-[#1A1714]' : 'text-[#8C8480]'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span className="w-4 h-4 flex items-center justify-center shrink-0 text-[#8C8480]">
          <i
            className={`ri-arrow-down-s-line text-base transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </span>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto bg-white border border-[#E8E0D4] rounded-md py-1.5 animate-[dropdownIn_0.2s_ease-out]"
          style={{ boxShadow: '0 18px 40px -18px rgba(44, 40, 37, 0.35)' }}
        >
          {options.map((opt, idx) => {
            const isSelected = opt.value === value;
            const isActive = idx === activeIndex;
            return (
              <li
                key={opt.value || `opt-${idx}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  commit(opt.value);
                }}
                className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                  isSelected
                    ? 'text-[#C9A84C] font-medium bg-[#C9A84C]/[0.12]'
                    : isActive
                      ? 'text-[#C9A84C] bg-[#C9A84C]/[0.06]'
                      : 'text-[#4A4540]'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && (
                  <span className="w-4 h-4 flex items-center justify-center shrink-0">
                    <i className="ri-check-line text-sm" />
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}