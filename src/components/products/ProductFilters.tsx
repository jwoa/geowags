"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, X, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-sm text-[var(--geowags-red)] hover:text-[var(--geowags-red-dark)] transition-colors"
          >
            Clear all ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Filter Sections */}
      {filterSections.map((section) => (
        <div key={section.id} className="border-b border-gray-200 pb-4">
          <button
            onClick={() => handleToggleSection(section.id)}
            className="flex items-center justify-between w-full py-2 text-left"
            aria-expanded={expandedSections.includes(section.id)}
          >
            <span className="font-medium text-gray-900">{section.label}</span>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform ${
                expandedSections.includes(section.id) ? "rotate-180" : ""
              }`}
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
                <div className="pt-2 space-y-2">
                  {section.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={isFilterActive(section.id, option.value)}
                        onChange={() => handleFilterChange(section.id, option.value)}
                        className="w-4 h-4 border-gray-300 rounded text-[var(--geowags-red)] focus:ring-[var(--geowags-red)] focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
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
      <aside className={`hidden lg:block ${className}`}>
        <FilterContent />
      </aside>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 btn btn-primary shadow-lg"
      >
        <Filter className="w-5 h-5" />
        Filters
        {activeFilterCount > 0 && (
          <span className="ml-2 w-5 h-5 flex items-center justify-center bg-white text-[var(--geowags-red)] text-xs font-bold rounded-full">
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
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
              onClick={() => setMobileFiltersOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="lg:hidden fixed top-0 right-0 w-full max-w-sm h-full bg-white z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
                <h2 className="font-medium text-lg">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                  aria-label="Close filters"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <FilterContent />
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="btn btn-primary w-full"
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

