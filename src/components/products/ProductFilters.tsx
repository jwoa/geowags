"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type FilterSection = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
};

const filterSections: FilterSection[] = [
  {
    id: "category",
    label: "Category",
    options: PRODUCT_CATEGORIES.map((cat) => ({
      value: cat.slug,
      label: cat.name,
    })),
  },
  {
    id: "finish",
    label: "Finish",
    options: [
      { value: "matte", label: "Matte" },
      { value: "glossy", label: "Glossy" },
      { value: "polished", label: "Polished" },
      { value: "textured", label: "Textured" },
      { value: "satin", label: "Satin" },
    ],
  },
  {
    id: "color",
    label: "Color",
    options: [
      { value: "white", label: "White" },
      { value: "black", label: "Black" },
      { value: "gray", label: "Gray" },
      { value: "beige", label: "Beige" },
      { value: "brown", label: "Brown" },
      { value: "blue", label: "Blue" },
      { value: "green", label: "Green" },
    ],
  },
  {
    id: "size",
    label: "Size",
    options: [
      { value: "30x30", label: "30x30 cm" },
      { value: "60x60", label: "60x60 cm" },
      { value: "30x60", label: "30x60 cm" },
      { value: "80x80", label: "80x80 cm" },
      { value: "60x120", label: "60x120 cm" },
    ],
  },
];

type ProductFiltersProps = {
  className?: string;
};

export const ProductFilters = ({ className = "" }: ProductFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [expandedSections, setExpandedSections] = useState<string[]>(["category"]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const handleToggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleFilterChange = (sectionId: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(sectionId)?.split(",").filter(Boolean) || [];

    if (currentValues.includes(value)) {
      const newValues = currentValues.filter((v) => v !== value);
      if (newValues.length > 0) {
        params.set(sectionId, newValues.join(","));
      } else {
        params.delete(sectionId);
      }
    } else {
      params.set(sectionId, [...currentValues, value].join(","));
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push("/products");
  };

  const isFilterActive = (sectionId: string, value: string): boolean => {
    const currentValues = searchParams.get(sectionId)?.split(",") || [];
    return currentValues.includes(value);
  };

  const activeFilterCount = filterSections.reduce((count, section) => {
    const values = searchParams.get(section.id)?.split(",").filter(Boolean) || [];
    return count + values.length;
  }, 0);

  const FilterContent = () => (
    <div className="filters-panel">
      {/* Header */}
      <div className="filters-header">
        <h3 className="heading-4">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearAll}
            className="filters-clear"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.id} className="filter-section">
          <button
            onClick={() => handleToggleSection(section.id)}
            className="filter-toggle"
            aria-expanded={expandedSections.includes(section.id)}
          >
            <span className="text-subtle">{section.label}</span>
            <ChevronDown
              className="text-subtle"
              style={{
                transform: expandedSections.includes(section.id)
                  ? "rotate(180deg)"
                  : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </button>

          <AnimatePresence>
            {expandedSections.includes(section.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="filter-options">
                  {section.options.map((option) => (
                    <label
                      key={option.value}
                      className="filter-option"
                    >
                      <input
                        type="checkbox"
                        checked={isFilterActive(section.id, option.value)}
                        onChange={() => handleFilterChange(section.id, option.value)}
                      />
                      <span className="text-subtle">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <aside className={cn("hide-mobile", className)}>
        <div
          style={{ position: "sticky", top: "calc(var(--header-height) + 2rem)" }}
        >
          <FilterContent />
        </div>
      </aside>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="mobile-filters-button show-mobile btn btn-primary"
      >
        <Filter className="w-5 h-5" />
        Filters
        {activeFilterCount > 0 && (
          <span className="badge badge-primary" style={{ minWidth: "1.5rem" }}>
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Filters Panel */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-filters-backdrop show-mobile"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="mobile-filters-panel show-mobile"
            >
              {/* Header */}
              <div className="mobile-filters-header">
                <h2 className="heading-4">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="icon-button"
                  aria-label="Close filters"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="mobile-filters-body">
                <FilterContent />
              </div>

              {/* Footer */}
              <div className="mobile-filters-footer">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="btn btn-primary full-width"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

