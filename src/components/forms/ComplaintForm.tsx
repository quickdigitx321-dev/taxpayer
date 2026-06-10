"use client";

import { FormEvent, useRef, useState } from "react";
import { postPublicForm } from "@/lib/api";
import { FormStatus } from "./FormStatus";

const initialValues = {
  fullName: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};
const phoneRegex = /^[+0-9\s()-]{7,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Field({
  label,
  error,
  children,
  span2
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <label className={`grid gap-1.5${span2 ? " md:col-span-2" : ""}`}>
      <span className="text-xs font-bold uppercase tracking-[0.12em] text-charcoal-700">
        {label}
      </span>
      {children}
      {error ? (
        <span className="text-xs font-semibold text-red-600">{error}</span>
      ) : null}
    </label>
  );
}

const inputBase =
  "border bg-white px-4 py-3 text-sm text-charcoal-900 outline-none placeholder:text-charcoal-300 transition-colors duration-150";
const inputNormal = "border-charcoal-200 focus:border-forest-600 focus:ring-2 focus:ring-forest-100";
const inputError = "border-red-300 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100";

export function ComplaintForm() {
  const formStartedAt = useRef(Date.now());
  const [values, setValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const antiSpamFields = {
      website: String(formData.get("website") || ""),
      formStartedAt: String(formData.get("formStartedAt") || "")
    };
    setStatus(null);

    const nextErrors: Record<string, string> = {};
    if (values.fullName.trim().length < 2) nextErrors.fullName = "Full name must be at least 2 characters.";
    if (!emailRegex.test(values.email.trim())) nextErrors.email = "Enter a valid email address.";
    if (!phoneRegex.test(values.phone.trim())) nextErrors.phone = "Enter a valid phone number.";
    if (values.subject.trim().length < 3) nextErrors.subject = "Subject must be at least 3 characters.";
    if (values.message.trim().length < 10) nextErrors.message = "Message must be at least 10 characters.";

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: "error", message: "Please correct the highlighted fields before submitting." });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await postPublicForm("/complaints", { ...values, ...antiSpamFields });
      setStatus({
        type: result.ok ? "success" : "error",
        message:
          result.ok && result.id
            ? `Your complaint/suggestion has been received. Reference number: TPAP-CMP-${String(result.id).padStart(5, "0")}.`
            : result.message
      });
      if (result.ok) {
        setValues(initialValues);
        setFieldErrors({});
      } else if (result.errors) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(result.errors).map(([field, errors]) => [field, errors[0] || "Please check this field."])
          )
        );
      }
    } catch {
      setStatus({ type: "error", message: "Your submission could not be sent right now. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(name: keyof typeof initialValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="border border-charcoal-100 bg-white p-7 shadow-[0_12px_48px_rgba(0,38,66,0.08)] md:p-9"
    >
      <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} />
      <input name="formStartedAt" type="hidden" value={formStartedAt.current} />

      <div className="mb-6">
        <FormStatus status={status} />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Full Name" error={fieldErrors.fullName}>
          <input
            aria-invalid={Boolean(fieldErrors.fullName)}
            className={`${inputBase} ${fieldErrors.fullName ? inputError : inputNormal}`}
            onChange={(e) => updateField("fullName", e.target.value)}
            required
            value={values.fullName}
          />
        </Field>

        <Field label="Email Address" error={fieldErrors.email}>
          <input
            autoComplete="email"
            aria-invalid={Boolean(fieldErrors.email)}
            className={`${inputBase} ${fieldErrors.email ? inputError : inputNormal}`}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="name@example.com"
            required
            type="email"
            value={values.email}
          />
        </Field>

        <Field label="Phone Number" error={fieldErrors.phone}>
          <input
            autoComplete="tel"
            aria-invalid={Boolean(fieldErrors.phone)}
            className={`${inputBase} ${fieldErrors.phone ? inputError : inputNormal}`}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="03001234567"
            required
            value={values.phone}
          />
        </Field>

        <Field label="Subject" error={fieldErrors.subject}>
          <input
            aria-invalid={Boolean(fieldErrors.subject)}
            className={`${inputBase} ${fieldErrors.subject ? inputError : inputNormal}`}
            onChange={(e) => updateField("subject", e.target.value)}
            required
            value={values.subject}
          />
        </Field>

        <Field label="Complaint / Suggestion" error={fieldErrors.message} span2>
          <textarea
            aria-invalid={Boolean(fieldErrors.message)}
            className={`${inputBase} min-h-44 resize-y ${fieldErrors.message ? inputError : inputNormal}`}
            onChange={(e) => updateField("message", e.target.value)}
            required
            value={values.message}
          />
        </Field>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-forest-800 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.1em] text-white transition-colors duration-150 hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting…" : "Submit Complaint"}
          </button>
          <p className="mt-3 text-center text-xs text-charcoal-400">
            Strictly confidential — not shared with tax authorities without your consent.
          </p>
        </div>
      </div>
    </form>
  );
}
