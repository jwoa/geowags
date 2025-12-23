"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type SpecificationsEditorProps = {
  specifications: Record<string, string>;
  onChange: (specs: Record<string, string>) => void;
  label?: string;
};

export const SpecificationsEditor = ({
  specifications,
  onChange,
  label = "Specifications",
}: SpecificationsEditorProps) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const entries = Object.entries(specifications);

  const handleAdd = () => {
    if (!newKey.trim() || !newValue.trim()) return;

    onChange({
      ...specifications,
      [newKey.trim()]: newValue.trim(),
    });
    setNewKey("");
    setNewValue("");
  };

  const handleRemove = (key: string) => {
    const updated = { ...specifications };
    delete updated[key];
    onChange(updated);
  };

  const handleUpdate = (oldKey: string, newKey: string, value: string) => {
    const updated = { ...specifications };
    if (oldKey !== newKey) {
      delete updated[oldKey];
    }
    updated[newKey] = value;
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Existing specifications */}
      {entries.length > 0 && (
        <div className="space-y-2">
          {entries.map(([key, value]) => (
            <div key={key} className="flex gap-2 items-center">
              <input
                type="text"
                value={key}
                onChange={(e) => handleUpdate(key, e.target.value, value)}
                placeholder="Key"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => handleUpdate(key, key, e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => handleRemove(key)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add new specification */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
          placeholder="New key (e.g., Dimensions)"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
        />
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          placeholder="Value"
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newKey.trim() || !newValue.trim()}
          className="px-3 py-2 bg-gray-800 text-white text-sm rounded-sm hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

