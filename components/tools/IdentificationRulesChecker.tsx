"use client";

import { useState } from "react";

export default function IdentificationRulesChecker() {
  const [numProperties, setNumProperties] = useState("");
  const [totalIdentifiedValue, setTotalIdentifiedValue] = useState("");
  const [relinquishedValue, setRelinquishedValue] = useState("");

  const checkRules = () => {
    const numProps = parseInt(numProperties) || 0;
    const totalValue = parseFloat(totalIdentifiedValue) || 0;
    const relValue = parseFloat(relinquishedValue) || 0;

    // Three Property Rule: Can identify up to 3 properties
    const threePropertyRule = numProps <= 3;
    const threePropertyRuleMessage = threePropertyRule
      ? "Satisfied: You can identify up to 3 properties"
      : "Not satisfied: You can only identify up to 3 properties";

    // 200% Rule: Total value of identified properties cannot exceed 200% of relinquished property value
    const twoHundredPercentLimit = relValue * 2;
    const twoHundredPercentRule = totalValue <= twoHundredPercentLimit;
    const twoHundredPercentRuleMessage = twoHundredPercentRule
      ? `Satisfied: Total identified value (${totalValue.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })}) is within 200% limit (${twoHundredPercentLimit.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })})`
      : `Not satisfied: Total identified value exceeds 200% of relinquished value`;

    // 95% Rule: Must acquire at least 95% of the identified property value
    const ninetyFivePercentThreshold = totalValue * 0.95;
    const ninetyFivePercentRule = relValue >= ninetyFivePercentThreshold;
    const ninetyFivePercentRuleMessage = ninetyFivePercentRule
      ? `Satisfied: Relinquished value meets 95% threshold`
      : `Not satisfied: Must acquire at least 95% of identified value (${ninetyFivePercentThreshold.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })})`;

    // Overall compliance
    const isCompliant = threePropertyRule && twoHundredPercentRule && ninetyFivePercentRule;

    return {
      threePropertyRule,
      threePropertyRuleMessage,
      twoHundredPercentRule,
      twoHundredPercentRuleMessage,
      twoHundredPercentLimit,
      ninetyFivePercentRule,
      ninetyFivePercentRuleMessage,
      ninetyFivePercentThreshold,
      isCompliant,
    };
  };

  const results = checkRules();
  const hasInputs = numProperties || totalIdentifiedValue || relinquishedValue;

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        Identification Rules Checker
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-[#1E1E1E]/80">
        Validate your property identification against the 3-property, 200%, and 95% identification rules.
      </p>

      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <label
              htmlFor="num-properties"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Number of Properties Identified
            </label>
            <input
              type="number"
              id="num-properties"
              value={numProperties}
              onChange={(e) => setNumProperties(e.target.value)}
              placeholder="0"
              min="0"
              max="10"
              step="1"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Total number of replacement properties identified
            </p>
          </div>

          <div>
            <label
              htmlFor="total-identified-value"
              className="mb-2 block text-sm font-medium text-[#0C1E2E]"
            >
              Total Identified Value ($)
            </label>
            <input
              type="number"
              id="total-identified-value"
              value={totalIdentifiedValue}
              onChange={(e) => setTotalIdentifiedValue(e.target.value)}
              placeholder="0"
              min="0"
              step="1000"
              className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            />
            <p className="mt-1 text-xs text-[#1E1E1E]/60">
              Combined value of all identified properties
            </p>
          </div>

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
        </div>

        {hasInputs && (
          <div className="space-y-4 rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6">
            <div className="mb-4">
              <h3 className="mb-2 font-semibold text-lg text-[#0C1E2E]">
                Rule Compliance Status
              </h3>
              <div
                className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${
                  results.isCompliant
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {results.isCompliant
                  ? "✓ All Rules Satisfied"
                  : "⚠ Some Rules Not Satisfied"}
              </div>
            </div>

            <div className="space-y-4">
              <div
                className={`rounded-lg border-2 p-4 ${
                  results.threePropertyRule
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-xl font-bold ${
                      results.threePropertyRule ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {results.threePropertyRule ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base text-[#0C1E2E]">
                      Three Property Rule
                    </h4>
                    <p className="mt-1 text-sm text-[#1E1E1E]/80">
                      {results.threePropertyRuleMessage}
                    </p>
                    <p className="mt-2 text-xs text-[#1E1E1E]/60">
                      You can identify up to 3 replacement properties without regard to their value.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-lg border-2 p-4 ${
                  results.twoHundredPercentRule
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-xl font-bold ${
                      results.twoHundredPercentRule
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {results.twoHundredPercentRule ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base text-[#0C1E2E]">
                      200% Rule
                    </h4>
                    <p className="mt-1 text-sm text-[#1E1E1E]/80">
                      {results.twoHundredPercentRuleMessage}
                    </p>
                    <p className="mt-2 text-xs text-[#1E1E1E]/60">
                      If you identify more than 3 properties, the total value cannot exceed 200% of the relinquished property value.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-lg border-2 p-4 ${
                  results.ninetyFivePercentRule
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`text-xl font-bold ${
                      results.ninetyFivePercentRule
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {results.ninetyFivePercentRule ? "✓" : "✗"}
                  </span>
                  <div className="flex-1">
                    <h4 className="font-semibold text-base text-[#0C1E2E]">
                      95% Rule
                    </h4>
                    <p className="mt-1 text-sm text-[#1E1E1E]/80">
                      {results.ninetyFivePercentRuleMessage}
                    </p>
                    <p className="mt-2 text-xs text-[#1E1E1E]/60">
                      You must acquire at least 95% of the value of the identified properties to satisfy this rule.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] p-4">
          <h4 className="mb-2 font-semibold text-sm text-[#0C1E2E]">
            Understanding Identification Rules
          </h4>
          <ul className="space-y-2 text-xs leading-relaxed text-[#1E1E1E]/80">
            <li>
              <strong>Three Property Rule:</strong> You can identify up to 3 replacement properties without regard to their value. This is the simplest rule to satisfy.
            </li>
            <li>
              <strong>200% Rule:</strong> If you identify more than 3 properties, the total value of all identified properties cannot exceed 200% of the relinquished property value.
            </li>
            <li>
              <strong>95% Rule:</strong> You must acquire at least 95% of the value of the identified properties. This rule applies regardless of how many properties you identify.
            </li>
            <li className="mt-2 pt-2 border-t border-[#E5E7EB]">
              <strong>Important:</strong> You must satisfy at least one of these rules. The three property rule is the most commonly used and easiest to satisfy.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

