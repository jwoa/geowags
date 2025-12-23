"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

type TagsEditorProps = {
  tags: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
};

export const TagsEditor = ({
  tags,
  onChange,
  label = "Tags",
  placeholder = "Add a tag...",
}: TagsEditorProps) => {
  const [newTag, setNewTag] = useState("");

  const handleAdd = () => {
    const tag = newTag.trim();
    if (!tag || tags.includes(tag)) return;
    onChange([...tags, tag]);
    setNewTag("");
  };

  const handleRemove = (index: number) => {
    onChange(tags.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Existing tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Add new tag */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!newTag.trim()}
          className="px-3 py-2 bg-gray-800 text-white text-sm rounded-sm hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

