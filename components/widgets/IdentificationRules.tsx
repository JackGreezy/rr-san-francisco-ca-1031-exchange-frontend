export default function IdentificationRules() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8">
      <h2 className="mb-6 font-semibold text-2xl text-[#0C1E2E]">
        Identification Rules Explained
      </h2>
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 font-semibold text-lg text-[#0C1E2E]">
            Three Property Rule
          </h3>
          <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
            You may identify up to three replacement properties of any value.
            You must close on at least one of the identified properties to
            complete your exchange.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-lg text-[#0C1E2E]">
            200 Percent Rule
          </h3>
          <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
            You may identify more than three replacement properties if the
            total fair market value of all identified properties does not exceed
            200 percent of the fair market value of the relinquished property.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-lg text-[#0C1E2E]">
            95 Percent Exception
          </h3>
          <p className="text-sm leading-relaxed text-[#1E1E1E]/80">
            You may identify more than three properties and exceed 200 percent
            of value if you receive at least 95 percent of the fair market
            value of all identified properties before the 180 day deadline.
          </p>
        </div>
        <p className="text-xs text-[#1E1E1E]/60">
          Identification must be in writing and delivered to your qualified
          intermediary by midnight on Day 45. Consult your qualified
          intermediary and tax advisor for definitive guidance.
        </p>
      </div>
    </div>
  );
}

