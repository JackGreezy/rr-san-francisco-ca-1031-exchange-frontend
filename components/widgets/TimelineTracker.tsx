"use client";

import { useState } from "react";

export default function TimelineTracker() {
  const [saleDate, setSaleDate] = useState("");
  const [identificationDate, setIdentificationDate] = useState("");
  const [closingDate, setClosingDate] = useState("");

  const milestones = [
    {
      label: "Day 0: Sale of Relinquished Property",
      date: saleDate,
      status: saleDate ? "completed" : "pending",
    },
    {
      label: "Day 45: Identification Deadline",
      date: identificationDate,
      status: identificationDate ? "completed" : "pending",
    },
    {
      label: "Day 180: Closing Deadline",
      date: closingDate,
      status: closingDate ? "completed" : "pending",
    },
  ];

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        Timeline Tracker
      </h2>
      <div className="space-y-6">
        {milestones.map((milestone, index) => (
          <div key={index}>
            <label
              htmlFor={`milestone-${index}`}
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              {milestone.label}
            </label>
            <input
              type="date"
              id={`milestone-${index}`}
              value={
                index === 0
                  ? saleDate
                  : index === 1
                    ? identificationDate
                    : closingDate
              }
              onChange={(e) => {
                if (index === 0) setSaleDate(e.target.value);
                if (index === 1) setIdentificationDate(e.target.value);
                if (index === 2) setClosingDate(e.target.value);
              }}
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            {milestone.status === "completed" && milestone.date && (
              <p className="mt-2 text-xs text-green-600">
                Completed on {new Date(milestone.date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
        <p className="text-xs text-[#1E1E1E]/60">
          Track your key milestones from sale to close. Consult your qualified
          intermediary and tax advisor for definitive guidance.
        </p>
      </div>
    </div>
  );
}

