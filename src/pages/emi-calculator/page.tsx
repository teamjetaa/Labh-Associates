import { useState, useCallback } from 'react';

export default function EMICalculatorPage() {
  const [loanAmount, setLoanAmount] = useState<number>(1000000);
  const [interestRate, setInterestRate] = useState<number>(10);
  const [loanTenure, setLoanTenure] = useState<number>(10);

  const calculateEMI = useCallback(() => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const months = loanTenure * 12;

    if (rate === 0) return principal / months;

    const emi =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    return emi;
  }, [loanAmount, interestRate, loanTenure]);

  const emi = calculateEMI();
  const totalPayment = emi * loanTenure * 12;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      {/* Page Header */}
      <section
        className="py-16 md:py-24 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2C2825 0%, #3D3530 50%, #2C2825 100%)',
          backgroundSize: '200% 200%',
          animation: 'heroGradient 15s ease infinite',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center relative">
          <h1 className="text-3xl md:text-5xl font-bold font-heading text-[#F2EDE4]">EMI Calculator</h1>
          <p className="text-[#8C8480] mt-3 text-sm md:text-base max-w-xl mx-auto">
            Calculate your monthly EMI, total interest, and total payment in seconds
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Inputs */}
            <div className="lg:col-span-3 space-y-6 md:space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium font-label text-[#1A1714]">
                    Loan Amount
                  </label>
                  <span className="text-sm font-semibold text-[#C9A84C] font-label">
                    {formatCurrency(loanAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="100000"
                  max="100000000"
                  step="100000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#C9A84C' }}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm font-label text-[#1A1714] focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium font-label text-[#1A1714]">
                    Interest Rate (% per annum)
                  </label>
                  <span className="text-sm font-semibold text-[#C9A84C] font-label">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#C9A84C' }}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm font-label text-[#1A1714] focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium font-label text-[#1A1714]">
                    Loan Tenure (Years)
                  </label>
                  <span className="text-sm font-semibold text-[#C9A84C] font-label">
                    {loanTenure} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{ accentColor: '#C9A84C' }}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-[#E8E0D4] rounded-sm text-sm font-label text-[#1A1714] focus:border-[#C9A84C] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-2">
              <div className="rounded-md p-6 md:p-8 space-y-6" style={{ backgroundColor: '#2C2825' }}>
                <h3 className="text-lg font-bold font-heading text-[#F2EDE4]">Loan Summary</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-sm text-[#8C8480]">Monthly EMI</span>
                    <span className="text-xl md:text-2xl font-bold font-heading text-[#C9A84C]">
                      {formatCurrency(emi)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-sm text-[#8C8480]">Total Interest Payable</span>
                    <span className="text-lg font-semibold font-heading text-[#F2EDE4]">
                      {formatCurrency(totalInterest)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-sm text-[#8C8480]">Total Payment</span>
                    <span className="text-lg font-semibold font-heading text-[#F2EDE4]">
                      {formatCurrency(totalPayment)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#8C8480]">Principal Amount</span>
                    <span className="text-lg font-semibold font-heading text-[#F2EDE4]">
                      {formatCurrency(loanAmount)}
                    </span>
                  </div>
                </div>

                {/* Breakdown Bar */}
                <div className="pt-2">
                  <div className="h-3 rounded-full overflow-hidden flex">
                    <div
                      className="bg-gold"
                      style={{ width: `${(loanAmount / totalPayment) * 100}%` }}
                    />
                    <div
                      className="bg-white/30"
                      style={{ width: `${(totalInterest / totalPayment) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#C9A84C]" />
                      <span className="text-xs text-[#8C8480]">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-white/30" />
                      <span className="text-xs text-[#8C8480]">Interest</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}