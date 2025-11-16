"use client";

import { useState } from "react";

export default function DeadlineCalculator() {
  const [saleDate, setSaleDate] = useState("");
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const calculateDeadlines = () => {
    if (!saleDate) return null;

    const sale = new Date(saleDate);
    const day45 = new Date(sale);
    day45.setDate(day45.getDate() + 45);
    const day180 = new Date(sale);
    day180.setDate(day180.getDate() + 180);

    return {
      day0: sale,
      day45,
      day180,
    };
  };

  const deadlines = calculateDeadlines();

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        45 Day and 180 Day Deadline Calculator
      </h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="sale-date"
            className="mb-2 block text-sm font-medium text-[#0C1E2E]"
          >
            Sale Date (Day 0)
          </label>
          <input
            type="date"
            id="sale-date"
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
          />
        </div>

        <div>
          <label
            htmlFor="timezone"
            className="mb-2 block text-sm font-medium text-[#0C1E2E]"
          >
            Timezone
          </label>
          <select
            id="timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
          >
            {Intl.supportedValuesOf("timeZone").map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </div>

        {deadlines && (
          <div className="space-y-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                Day 0 (Sale Date)
              </p>
              <p className="mt-1 font-semibold text-lg text-[#0C1E2E]">
                {deadlines.day0.toLocaleDateString("en-US", {
                  timeZone: timezone,
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                Day 45 (Identification Deadline)
              </p>
              <p className="mt-1 font-semibold text-lg text-[#0C1E2E]">
                {deadlines.day45.toLocaleDateString("en-US", {
                  timeZone: timezone,
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-1 text-sm text-[#1E1E1E]/70">
                Identification letter must be delivered by midnight.
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0C1E2E]/70">
                Day 180 (Closing Deadline)
              </p>
              <p className="mt-1 font-semibold text-lg text-[#0C1E2E]">
                {deadlines.day180.toLocaleDateString("en-US", {
                  timeZone: timezone,
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-1 text-sm text-[#1E1E1E]/70">
                Replacement property must close by midnight.
              </p>
            </div>
          </div>
        )}

        <p className="text-xs text-[#1E1E1E]/60">
          Calendar days apply even when deadlines fall on weekends or holidays
          unless the IRS issues formal relief. Consult your qualified
          intermediary and tax advisor for definitive guidance.
        </p>
      </div>
    </div>
  );
}

