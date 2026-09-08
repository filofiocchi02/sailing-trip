"use client";

import { ChangeEvent, useState } from "react";

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  autoComplete: "current-password" | "new-password";
  minLength?: number;
};

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A11.6 11.6 0 0 1 12 5c5.2 0 8.6 4.4 9.7 6.2a1.5 1.5 0 0 1 0 .8 15.8 15.8 0 0 1-3.2 3.8M6.2 6.2A15.7 15.7 0 0 0 2.3 11.2a1.5 1.5 0 0 0 0 .8C3.4 13.8 6.8 18 12 18c.8 0 1.6-.1 2.3-.3" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2.3 12S5.7 6 12 6s9.7 6 9.7 6-3.4 6-9.7 6-9.7-6-9.7-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

export default function PasswordField({ label, value, onChange, placeholder, autoComplete, minLength }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="password-field">
      {label}
      <span className="password-input-wrap">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required
        />
        <button
          className="password-toggle"
          type="button"
          aria-label={visible ? "Hide password" : "Show password"}
          aria-pressed={visible}
          onClick={() => setVisible((current) => !current)}
        >
          <EyeIcon hidden={visible} />
        </button>
      </span>
    </label>
  );
}
