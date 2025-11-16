"use client";

import { useState } from "react";

export default function IdentificationLetter() {
  const [formData, setFormData] = useState({
    taxpayerName: "",
    relinquishedProperty: "",
    replacementProperties: "",
    date: new Date().toISOString().split("T")[0],
  });

  const generateLetter = () => {
    return `IDENTIFICATION OF REPLACEMENT PROPERTY(IES)
UNDER SECTION 1031 OF THE INTERNAL REVENUE CODE

Date: ${formData.date}

To: [Qualified Intermediary Name]
[Qualified Intermediary Address]

Re: Identification of Replacement Property(ies) for 1031 Exchange

Dear [Qualified Intermediary Name],

Pursuant to Treasury Regulation Section 1.1031(k)-1, I, ${formData.taxpayerName}, hereby identify the following replacement property(ies) in connection with my 1031 exchange:

Relinquished Property:
${formData.relinquishedProperty}

Replacement Property(ies):
${formData.replacementProperties}

This identification is made in accordance with the three property rule, 200 percent rule, or 95 percent exception as applicable.

I understand that this identification must be received by you no later than midnight on the 45th day following the transfer of the relinquished property.

Sincerely,

${formData.taxpayerName}
[Signature]

Date: ${formData.date}`;
  };

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        Identification Letter Helper
      </h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="taxpayer-name"
            className="mb-2 block text-sm font-medium text-[#0C1E2E]"
          >
            Taxpayer Name
          </label>
          <input
            type="text"
            id="taxpayer-name"
            value={formData.taxpayerName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, taxpayerName: e.target.value }))
            }
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            placeholder="John Doe"
          />
        </div>
        <div>
          <label
            htmlFor="relinquished-property"
            className="mb-2 block text-sm font-medium text-[#0C1E2E]"
          >
            Relinquished Property Description
          </label>
          <textarea
            id="relinquished-property"
            value={formData.relinquishedProperty}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                relinquishedProperty: e.target.value,
              }))
            }
            rows={3}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            placeholder="123 Main Street, City, State ZIP"
          />
        </div>
        <div>
          <label
            htmlFor="replacement-properties"
            className="mb-2 block text-sm font-medium text-[#0C1E2E]"
          >
            Replacement Property(ies) Description
          </label>
          <textarea
            id="replacement-properties"
            value={formData.replacementProperties}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                replacementProperties: e.target.value,
              }))
            }
            rows={5}
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
            placeholder="Property 1: 456 Oak Avenue, City, State ZIP&#10;Property 2: 789 Pine Road, City, State ZIP"
          />
        </div>
        <div>
          <label
            htmlFor="letter-date"
            className="mb-2 block text-sm font-medium text-[#0C1E2E]"
          >
            Date
          </label>
          <input
            type="date"
            id="letter-date"
            value={formData.date}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, date: e.target.value }))
            }
            className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0C1E2E] focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
          />
        </div>
        {formData.taxpayerName &&
          formData.relinquishedProperty &&
          formData.replacementProperties && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAFA] p-6">
              <h3 className="mb-4 font-semibold text-lg text-[#0C1E2E]">
                Draft Letter
              </h3>
              <pre className="whitespace-pre-wrap text-xs leading-relaxed text-[#1E1E1E]/80">
                {generateLetter()}
              </pre>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(generateLetter());
                }}
                className="mt-4 rounded-full border border-[#0C1E2E] px-6 py-2 text-sm font-medium text-[#0C1E2E] transition hover:bg-[#0C1E2E] hover:text-white"
              >
                Copy to Clipboard
              </button>
            </div>
          )}
        <p className="text-xs text-[#1E1E1E]/60">
          This is a draft template only. Review with your qualified intermediary
          and tax advisor before use. Not legal or tax advice.
        </p>
      </div>
    </div>
  );
}

