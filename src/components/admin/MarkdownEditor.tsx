"use client";

import { useState } from "react";
import { Bold, Italic, Link, List, Heading2, Eye, Edit3 } from "lucide-react";

type MarkdownEditorProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
};

export const MarkdownEditor = ({
  value,
  onChange,
  label = "Content",
  placeholder = "Write your content here...",
  rows = 10,
}: MarkdownEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);

  const handleInsert = (before: string, after: string = "") => {
    const textarea = document.querySelector("textarea[data-markdown-editor]") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length + after.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleBold = () => handleInsert("**", "**");
  const handleItalic = () => handleInsert("*", "*");
  const handleLink = () => handleInsert("[", "](url)");
  const handleList = () => handleInsert("\n- ");
  const handleHeading = () => handleInsert("\n## ");

  // Simple markdown to HTML conversion for preview
  const renderPreview = (text: string) => {
    let html = text
      // Headings
      .replace(/^### (.*$)/gim, "<h3>$1</h3>")
      .replace(/^## (.*$)/gim, "<h2>$1</h2>")
      .replace(/^# (.*$)/gim, "<h1>$1</h1>")
      // Bold and italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" class="text-[var(--geowags-red)] underline">$1</a>')
      // Lists
      .replace(/^\- (.*$)/gim, "<li>$1</li>")
      // Paragraphs
      .replace(/\n\n/gim, "</p><p>")
      .replace(/\n/gim, "<br>");

    // Wrap lists
    html = html.replace(/(<li>.*<\/li>)/gim, "<ul>$1</ul>");

    return `<p>${html}</p>`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        <button
          type="button"
          onClick={() => setIsPreview(!isPreview)}
          className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
        >
          {isPreview ? (
            <>
              <Edit3 className="w-3.5 h-3.5" />
              Edit
            </>
          ) : (
            <>
              <Eye className="w-3.5 h-3.5" />
              Preview
            </>
          )}
        </button>
      </div>

      {!isPreview && (
        <div className="border border-gray-300 rounded-sm overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-50 border-b border-gray-200">
            <button
              type="button"
              onClick={handleBold}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="Bold"
            >
              <Bold className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleItalic}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="Italic"
            >
              <Italic className="w-4 h-4" />
            </button>
            <div className="w-px h-5 bg-gray-300 mx-1" />
            <button
              type="button"
              onClick={handleHeading}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="Heading"
            >
              <Heading2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleList}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="List"
            >
              <List className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleLink}
              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded transition-colors"
              title="Link"
            >
              <Link className="w-4 h-4" />
            </button>
          </div>

          {/* Editor */}
          <textarea
            data-markdown-editor
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="w-full px-3 py-2 text-sm font-mono focus:outline-none resize-y"
          />
        </div>
      )}

      {isPreview && (
        <div
          className="px-4 py-3 border border-gray-300 rounded-sm bg-gray-50 prose prose-sm max-w-none min-h-[200px]"
          dangerouslySetInnerHTML={{ __html: renderPreview(value) }}
        />
      )}
    </div>
  );
};

