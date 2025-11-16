"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type HomepageSearchInputProps = {
  placeholder?: string;
  defaultValue?: string;
  action: string;
  onQueryChange?: (query: string) => void;
};

export default function HomepageSearchInput({
  placeholder = "Search...",
  defaultValue = "",
  action,
  onQueryChange,
}: HomepageSearchInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    if (onQueryChange) {
      onQueryChange(query.trim());
    } else {
      if (query.trim()) {
        router.push(`${action}?q=${encodeURIComponent(query.trim())}`);
      } else {
        router.push(action);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onQueryChange) {
      onQueryChange(newValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="search"
        name="q"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#E5E7EB] bg-white px-6 py-4 pr-12 text-sm text-[#0C1E2E] placeholder:text-[#1E1E1E]/50 focus:border-[#0C1E2E] focus:outline-none focus:ring-2 focus:ring-[#F5B32F]/50"
        aria-label="Search"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0C1E2E]/70 transition hover:text-[#0C1E2E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5B32F]"
        aria-label="Submit search"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16ZM19 19l-4.35-4.35"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue("");
            if (onQueryChange) {
              onQueryChange("");
            }
          }}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-[#0C1E2E]/50 transition hover:text-[#0C1E2E]"
          aria-label="Clear search"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4l8 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </form>
  );
}

