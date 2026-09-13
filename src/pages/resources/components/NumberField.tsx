interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  display?: string;
}

/* Reusable labelled slider + numeric input used by the calculators. */
export default function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  display,
}: NumberFieldProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium font-label text-[#1A1714]">{label}</label>
        <span className="text-sm font-semibold text-[#C9A84C] font-label">{display ?? value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-[#E8E0D4]"
        style={{ accentColor: '#C9A84C' }}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full px-4 py-2.5 border border-[#E8E0D4] rounded-md text-sm font-label text-[#1A1714] focus:border-[#C9A84C] transition-colors bg-white"
      />
    </div>
  );
}