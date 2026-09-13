import { useState, type ReactNode } from 'react';
import NumberField from './NumberField';

const inr = (n: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(n)));

const num = (n: number, digits = 2) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: digits }).format(Math.max(0, n));

function ResultRow({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="flex items-center justify-between py-3"
      style={{ borderBottom: '1px solid rgba(242,237,228,0.1)' }}
    >
      <span className="text-[13px] text-[#F2EDE4]/60">{label}</span>
      <span className={`font-heading ${accent ? 'text-[#C9A84C] text-xl' : 'text-[#F2EDE4] text-base'}`}>
        {value}
      </span>
    </div>
  );
}

function CalcShell({ inputs, results }: { inputs: ReactNode; results: ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
      <div className="lg:col-span-3 space-y-6 md:space-y-7">{inputs}</div>
      <div className="lg:col-span-2">
        <div className="glass-dark rounded-2xl p-6 md:p-8 lg:sticky lg:top-24">{results}</div>
      </div>
    </div>
  );
}

/* ---------- Compound Interest ---------- */
function CompoundCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [monthly, setMonthly] = useState(15000);
  const [rate, setRate] = useState(11);
  const [years, setYears] = useState(15);

  const n = years * 12;
  const r = rate / 1200;
  const fvLump = principal * Math.pow(1 + r, n);
  const fvSip = r === 0 ? monthly * n : monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
  const maturity = fvLump + fvSip;
  const invested = principal + monthly * n;
  const gains = maturity - invested;

  return (
    <CalcShell
      inputs={
        <>
          <NumberField label="Initial investment" value={principal} onChange={setPrincipal} min={0} max={10000000} step={10000} display={inr(principal)} />
          <NumberField label="Monthly contribution" value={monthly} onChange={setMonthly} min={0} max={500000} step={1000} display={inr(monthly)} />
          <NumberField label="Expected annual return" value={rate} onChange={setRate} min={1} max={20} step={0.5} display={`${rate}%`} />
          <NumberField label="Investment period" value={years} onChange={setYears} min={1} max={40} step={1} display={`${years} yrs`} />
        </>
      }
      results={
        <>
          <h3 className="font-heading text-lg text-[#F2EDE4] mb-2">Projected Maturity</h3>
          <ResultRow label="Total invested" value={inr(invested)} />
          <ResultRow label="Estimated gains" value={inr(gains)} />
          <ResultRow label="Maturity value" value={inr(maturity)} accent />
          <div className="mt-5">
            <div className="h-3 rounded-full overflow-hidden flex">
              <div style={{ width: `${(invested / maturity) * 100}%`, backgroundColor: '#E8D5A3' }} />
              <div style={{ width: `${(gains / maturity) * 100}%`, backgroundColor: '#C9A84C' }} />
            </div>
            <div className="flex items-center gap-4 mt-3">
              <span className="flex items-center gap-2 text-[11px] text-[#F2EDE4]/50">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#E8D5A3' }} /> Invested
              </span>
              <span className="flex items-center gap-2 text-[11px] text-[#F2EDE4]/50">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#C9A84C' }} /> Gains
              </span>
            </div>
          </div>
        </>
      }
    />
  );
}

/* ---------- Returns / CAGR ---------- */
function RoiCalculator() {
  const [initial, setInitial] = useState(500000);
  const [final, setFinal] = useState(1200000);
  const [years, setYears] = useState(5);

  const absolute = initial > 0 ? ((final - initial) / initial) * 100 : 0;
  const cagr = initial > 0 && years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : 0;
  const gain = final - initial;

  return (
    <CalcShell
      inputs={
        <>
          <NumberField label="Amount invested" value={initial} onChange={setInitial} min={10000} max={10000000} step={10000} display={inr(initial)} />
          <NumberField label="Current value" value={final} onChange={setFinal} min={10000} max={50000000} step={10000} display={inr(final)} />
          <NumberField label="Holding period" value={years} onChange={setYears} min={1} max={30} step={1} display={`${years} yrs`} />
        </>
      }
      results={
        <>
          <h3 className="font-heading text-lg text-[#F2EDE4] mb-2">Return Summary</h3>
          <ResultRow label="Absolute gain" value={inr(gain)} />
          <ResultRow label="Absolute return" value={`${num(absolute)}%`} />
          <ResultRow label="Annualised (CAGR)" value={`${num(cagr)}%`} accent />
        </>
      }
    />
  );
}

/* ---------- Retirement ---------- */
function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(32);
  const [retireAge, setRetireAge] = useState(60);
  const [monthlyExpense, setMonthlyExpense] = useState(60000);
  const [inflation, setInflation] = useState(6);

  const years = Math.max(1, retireAge - currentAge);
  const futureMonthly = monthlyExpense * Math.pow(1 + inflation / 100, years);
  const corpus = futureMonthly * 12 * 25;

  return (
    <CalcShell
      inputs={
        <>
          <NumberField label="Current age" value={currentAge} onChange={setCurrentAge} min={18} max={60} step={1} display={`${currentAge} yrs`} />
          <NumberField label="Retirement age" value={retireAge} onChange={setRetireAge} min={40} max={75} step={1} display={`${retireAge} yrs`} />
          <NumberField label="Monthly expense today" value={monthlyExpense} onChange={setMonthlyExpense} min={10000} max={1000000} step={5000} display={inr(monthlyExpense)} />
          <NumberField label="Inflation assumption" value={inflation} onChange={setInflation} min={3} max={10} step={0.5} display={`${inflation}%`} />
        </>
      }
      results={
        <>
          <h3 className="font-heading text-lg text-[#F2EDE4] mb-2">Retirement Target</h3>
          <ResultRow label="Years to retirement" value={`${years} yrs`} />
          <ResultRow label="Future monthly expense" value={inr(futureMonthly)} />
          <ResultRow label="Corpus needed*" value={inr(corpus)} accent />
          <p className="text-[11px] text-[#F2EDE4]/40 mt-4 leading-relaxed">
            * Indicative target based on a 25x annual-expense rule. Actual needs depend on
            post-retirement returns and lifestyle.
          </p>
        </>
      }
    />
  );
}

/* ---------- Loan Eligibility ---------- */
function LoanEligibilityCalculator() {
  const [income, setIncome] = useState(150000);
  const [existingEmi, setExistingEmi] = useState(25000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(20);

  const availableEmi = Math.max(0, income * 0.5 - existingEmi);
  const r = rate / 1200;
  const n = tenure * 12;
  const maxLoan = r === 0 ? availableEmi * n : (availableEmi * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));

  return (
    <CalcShell
      inputs={
        <>
          <NumberField label="Net monthly income" value={income} onChange={setIncome} min={20000} max={3000000} step={5000} display={inr(income)} />
          <NumberField label="Existing monthly EMIs" value={existingEmi} onChange={setExistingEmi} min={0} max={1000000} step={1000} display={inr(existingEmi)} />
          <NumberField label="Expected interest rate" value={rate} onChange={setRate} min={6} max={18} step={0.1} display={`${rate}%`} />
          <NumberField label="Tenure" value={tenure} onChange={setTenure} min={1} max={30} step={1} display={`${tenure} yrs`} />
        </>
      }
      results={
        <>
          <h3 className="font-heading text-lg text-[#F2EDE4] mb-2">Eligibility Estimate</h3>
          <ResultRow label="Eligible monthly EMI" value={inr(availableEmi)} />
          <ResultRow label="Indicative max loan" value={inr(maxLoan)} accent />
          <p className="text-[11px] text-[#F2EDE4]/40 mt-4 leading-relaxed">
            Based on a 50% fixed-obligation-to-income ratio. Final eligibility depends on the
            lender's credit policy and your profile.
          </p>
        </>
      }
    />
  );
}

const TABS = [
  { id: 'compound', label: 'Compound Interest' },
  { id: 'roi', label: 'Returns / CAGR' },
  { id: 'retirement', label: 'Retirement' },
  { id: 'eligibility', label: 'Loan Eligibility' },
];

export default function CalculatorTabs() {
  const [active, setActive] = useState('compound');

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex justify-center mb-10 md:mb-14">
        <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-full border border-[#E8E0D4] bg-white/70 backdrop-blur">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-label whitespace-nowrap transition-all duration-300 ${
                active === tab.id ? 'bg-[#C9A84C] text-[#2C2825]' : 'text-[#4A4540] hover:text-[#C9A84C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {active === 'compound' && <CompoundCalculator />}
      {active === 'roi' && <RoiCalculator />}
      {active === 'retirement' && <RetirementCalculator />}
      {active === 'eligibility' && <LoanEligibilityCalculator />}
    </div>
  );
}