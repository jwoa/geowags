"use client";

import { type InputHTMLAttributes, type TextareaHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  helpText?: string;
};

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  helpText?: string;
};

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helpText, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent transition-colors ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {helpText && !error && (
          <p className="text-xs text-gray-500">{helpText}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helpText, className = "", ...props }, ref) => {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <textarea
          ref={ref}
          className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent transition-colors resize-y ${
            error ? "border-red-500" : "border-gray-300"
          } ${className}`}
          {...props}
        />
        {helpText && !error && (
          <p className="text-xs text-gray-500">{helpText}</p>
        )}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);
FormTextarea.displayName = "FormTextarea";

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  helpText?: string;
  required?: boolean;
  placeholder?: string;
};

export const FormSelect = ({
  label,
  options,
  value,
  onChange,
  error,
  helpText,
  required,
  placeholder = "Select...",
}: SelectProps) => {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-[var(--geowags-red)] focus:border-transparent transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helpText && !error && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  helpText?: string;
};

export const FormCheckbox = ({ label, checked, onChange, helpText }: CheckboxProps) => {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 text-[var(--geowags-red)] border-gray-300 rounded focus:ring-[var(--geowags-red)]"
      />
      <div>
        <label className="text-sm font-medium text-gray-700">{label}</label>
        {helpText && <p className="text-xs text-gray-500">{helpText}</p>}
      </div>
    </div>
  );
};

