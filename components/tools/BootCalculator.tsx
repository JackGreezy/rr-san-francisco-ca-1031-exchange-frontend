"use client";

import { useState } from "react";

export default function BootCalculator() {
  const [relinquishedValue, setRelinquishedValue] = useState("");
  const [replacementValue, setReplacementValue] = useState("");
  const [cashReceived, setCashReceived] = useState("");
  const [oldMortgage, setOldMortgage] = useState("");
  const [newMortgage, setNewMortgage] = useState("");

  const calculateBoot = () => {
    const relValue = parseFloat(relinquishedValue) || 0;
    const repValue = parseFloat(replacementValue) || 0;
    const cash = parseFloat(cashReceived) || 0;
    const oldMort = parseFloat(oldMortgage) || 0;
    const newMort = parseFloat(newMortgage) || 0;

    // Cash boot is any cash received
    const cashBoot = cash;

    // Mortgage boot occurs when new debt is less than old debt
    const mortgageBoot = Math.max(0, oldMort - newMort);

    // Total boot
    const totalBoot = cashBoot + mortgageBoot;

    // Estimated tax (using illustrative 20% rate - should be noted as example)
    const estimatedTax = totalBoot * 0.2;

    // Net proceeds from relinquished property
    const netProceeds = relValue - oldMort;

    // Total consideration for replacement property
    const totalConsideration = repValue + cash;

    return {
      cashBoot,
      mortgageBoot,
      totalBoot,
      estimatedTax,
      netProceeds,
      totalConsideration,
      hasBoot: totalBoot > 0,
    };
  };

  const results = calculateBoot();
  const hasInputs =
    relinquishedValue || replacementValue || cashReceived || oldMortgage || newMortgage;

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        Boot Calculator
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-[#1E1E1E]/80">
        Calculate boot (cash received, mortgage relief, non-like-kind property) and estimate tax implications.
      </p>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="relinquished-value"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Relinquished Property Value ($)
            </label>
            <input
              type="number"
              id="relinquished-value"
              value={relinquishedValue}
              onChange={(e) => setRelinquishedValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Sale price of the property you're selling
            </p>
          </div>

          <div>
            <label
              htmlFor="replacement-value"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Replacement Property Value ($)
            </label>
            <input
              type="number"
              id="replacement-value"
              value={replacementValue}
              onChange={(e) => setReplacementValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Purchase price of the replacement property
            </p>
          </div>

          <div>
            <label
              htmlFor="cash-received"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Cash Received ($)
            </label>
            <input
              type="number"
              id="cash-received"
              value={cashReceived}
              onChange={(e) => setCashReceived(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Any cash received from the exchange
            </p>
          </div>

          <div>
            <label
              htmlFor="old-mortgage"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Old Mortgage Balance ($)
            </label>
            <input
              type="number"
              id="old-mortgage"
              value={oldMortgage}
              onChange={(e) => setOldMortgage(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Mortgage balance on relinquished property
            </p>
          </div>

          <div>
            <label
              htmlFor="new-mortgage"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              New Mortgage Balance ($)
            </label>
            <input
              type="number"
              id="new-mortgage"
              value={newMortgage}
              onChange={(e) => setNewMortgage(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Mortgage balance on replacement property
            </p>
          </div>
        </div>

        {hasInputs && (
          <div className="space-y-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6">
            <h3 className="font-semibold text-lg text-[#0C1E2E]">
              Calculation Results
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                  Cash Boot
                </p>
                <p className="mt-1 font-semibold text-xl text-[#0C1E2E]">
                  ${results.cashBoot.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-xs text-[#1E1E1E]/70">
                  Cash received from the exchange
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                  Mortgage Boot
                </p>
                <p className="mt-1 font-semibold text-xl text-[#0C1E2E]">
                  ${results.mortgageBoot.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-xs text-[#1E1E1E]/70">
                  Debt relief when new mortgage is less than old mortgage
                </p>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                  Total Boot
                </p>
                <p
                  className={`mt-1 font-semibold text-2xl ${
                    results.hasBoot ? "text-red-600" : "text-green-600"
                  }`}
                >
                  ${results.totalBoot.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="mt-1 text-xs text-[#1E1E1E]/70">
                  {results.hasBoot
                    ? "Boot is taxable in the year of exchange"
                    : "No boot - full tax deferral"}
                </p>
              </div>

              {results.hasBoot && (
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                    Estimated Tax on Boot
                  </p>
                  <p className="mt-1 font-semibold text-xl text-red-600">
                    ${results.estimatedTax.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p className="mt-1 text-xs text-[#1E1E1E]/70">
                    Illustrative estimate at 20% rate (actual rate varies)
                  </p>
                </div>
              )}
            </div>

            <div className="mt-6 border-t border-[#E5E7EB] pt-4">
              <h4 className="mb-3 font-semibold text-base text-[#0C1E2E]">
                Exchange Summary
              </h4>
              <div className="space-y-2 text-sm text-[#1E1E1E]/80">
                <div className="flex justify-between">
                  <span>Net Proceeds from Relinquished Property:</span>
                  <span className="font-medium">
                    ${results.netProceeds.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Total Consideration for Replacement:</span>
                  <span className="font-medium">
                    ${results.totalConsideration.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-4">
          <h4 className="mb-2 font-semibold text-sm text-[#0C1E2E]">
            Understanding Boot
          </h4>
          <ul className="space-y-1 text-xs leading-relaxed text-[#1E1E1E]/80">
            <li>
              <strong>Cash Boot:</strong> Any cash received during the exchange is taxable boot.
            </li>
            <li>
              <strong>Mortgage Boot:</strong> When your new mortgage is less than your old mortgage, the difference is treated as boot.
            </li>
            <li>
              <strong>Tax Implications:</strong> Boot is taxable as capital gain in the year of exchange. The actual tax rate depends on your tax bracket and holding period.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

