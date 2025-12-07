"use client";

import { useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
];

export const ProductSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="flex-row" style={{ gap: "0.75rem" }}>
      <label htmlFor="sort" className="text-subtle text-sm">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={handleSortChange}
        className="input"
        style={{ width: "auto", minWidth: "150px", padding: "0.5rem 0.75rem" }}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

