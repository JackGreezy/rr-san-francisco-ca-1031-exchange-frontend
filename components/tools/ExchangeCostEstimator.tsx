"use client";

import { useState } from "react";

export default function ExchangeCostEstimator() {
  const [propertyValue, setPropertyValue] = useState("");
  const [qiFeePercentage, setQiFeePercentage] = useState("1.0");
  const [escrowFee, setEscrowFee] = useState("");
  const [titleInsuranceRate, setTitleInsuranceRate] = useState("0.5");
  const [recordingFees, setRecordingFees] = useState("");

  const calculateCosts = () => {
    const propValue = parseFloat(propertyValue) || 0;
    const qiPercent = parseFloat(qiFeePercentage) || 0;
    const escrow = parseFloat(escrowFee) || 0;
    const titleRate = parseFloat(titleInsuranceRate) || 0;
    const recording = parseFloat(recordingFees) || 0;

    // QI fee calculation
    const qiFee = propValue * (qiPercent / 100);

    // Title insurance calculation
    const titleInsurance = propValue * (titleRate / 100);

    // Total costs
    const totalCosts = qiFee + escrow + titleInsurance + recording;

    // Cost breakdown
    const breakdown = [
      {
        label: "Qualified Intermediary Fee",
        amount: qiFee,
        percentage: propValue > 0 ? (qiFee / propValue) * 100 : 0,
      },
      {
        label: "Escrow Fee",
        amount: escrow,
        percentage: propValue > 0 ? (escrow / propValue) * 100 : 0,
      },
      {
        label: "Title Insurance",
        amount: titleInsurance,
        percentage: propValue > 0 ? (titleInsurance / propValue) * 100 : 0,
      },
      {
        label: "Recording Fees",
        amount: recording,
        percentage: propValue > 0 ? (recording / propValue) * 100 : 0,
      },
    ];

    return {
      qiFee,
      escrowFee: escrow,
      titleInsurance,
      recordingFees: recording,
      totalCosts,
      breakdown,
      costPercentage: propValue > 0 ? (totalCosts / propValue) * 100 : 0,
    };
  };

  const results = calculateCosts();
  const hasInputs = propertyValue || escrowFee || recordingFees;

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        Exchange Cost Estimator
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-[#1E1E1E]/80">
        Calculate QI fees, escrow costs, title insurance, recording fees, and other closing costs for your 1031 exchange.
      </p>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="property-value"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Property Value ($)
            </label>
            <input
              type="number"
              id="property-value"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Value of the property being exchanged
            </p>
          </div>

          <div>
            <label
              htmlFor="qi-fee-percentage"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              QI Fee Percentage (%)
            </label>
            <input
              type="number"
              id="qi-fee-percentage"
              value={qiFeePercentage}
              onChange={(e) => setQiFeePercentage(e.target.value)}
              placeholder="1.0"
              min="0"
              max="10"
              step="0.1"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Typical range: 0.5% - 2.0% of property value
            </p>
          </div>

          <div>
            <label
              htmlFor="escrow-fee"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Escrow Fee ($)
            </label>
            <input
              type="number"
              id="escrow-fee"
              value={escrowFee}
              onChange={(e) => setEscrowFee(e.target.value)}
              placeholder="0"
              min="0"
              step="100"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Escrow company fees (varies by location and transaction size)
            </p>
          </div>

          <div>
            <label
              htmlFor="title-insurance-rate"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Title Insurance Rate (%)
            </label>
            <input
              type="number"
              id="title-insurance-rate"
              value={titleInsuranceRate}
              onChange={(e) => setTitleInsuranceRate(e.target.value)}
              placeholder="0.5"
              min="0"
              max="5"
              step="0.1"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Typical range: 0.3% - 0.8% of property value
            </p>
          </div>

          <div>
            <label
              htmlFor="recording-fees"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Recording Fees ($)
            </label>
            <input
              type="number"
              id="recording-fees"
              value={recordingFees}
              onChange={(e) => setRecordingFees(e.target.value)}
              placeholder="0"
              min="0"
              step="10"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              County recording fees (varies by county)
            </p>
          </div>
        </div>

        {hasInputs && (
          <div className="space-y-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6">
            <h3 className="font-semibold text-lg text-[#0C1E2E]">
              Cost Breakdown
            </h3>

            <div className="space-y-3">
              {results.breakdown.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 py-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#0C1E2E]">
                      {item.label}
                    </p>
                    {propertyValue && (
                      <p className="text-xs text-[#1E1E1E]/60">
                        {item.percentage.toFixed(2)}% of property value
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-lg text-[#0C1E2E]">
                    ${item.amount.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-[#E5E7EB] pt-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-[#0C1E2E]">
                  Total Exchange Costs
                </p>
                <p className="font-bold text-2xl text-[#0C1E2E]">
                  ${results.totalCosts.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              {propertyValue && (
                <p className="mt-2 text-xs text-[#1E1E1E]/70">
                  {results.costPercentage.toFixed(2)}% of property value
                </p>
              )}
            </div>
          </div>
        )}

        <div className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-4">
          <h4 className="mb-2 font-semibold text-sm text-[#0C1E2E]">
            Cost Considerations
          </h4>
          <ul className="space-y-1 text-xs leading-relaxed text-[#1E1E1E]/80">
            <li>
              <strong>Qualified Intermediary Fees:</strong> Typically range from 0.5% to 2.0% of property value, depending on transaction complexity.
            </li>
            <li>
              <strong>Escrow Fees:</strong> Vary by location and transaction size. California escrow fees are typically higher than other states.
            </li>
            <li>
              <strong>Title Insurance:</strong> Rates vary by state and property value. California rates are typically 0.3% - 0.8% of property value.
            </li>
            <li>
              <strong>Recording Fees:</strong> County-specific fees for recording deeds and other documents. California does not impose a state real estate transfer tax, but recording fees still apply.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

