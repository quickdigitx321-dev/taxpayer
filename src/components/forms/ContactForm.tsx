"use client";

import { FormEvent, useRef, useState } from "react";
import { postPublicForm } from "@/lib/api";
import { FormStatus } from "./FormStatus";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: ""
};
const phoneRegex = /^[+0-9\s()-]{7,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
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

    if (values.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }
    if (!emailRegex.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!phoneRegex.test(values.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (values.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields before submitting."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await postPublicForm("/contact-inquiries", {
        ...values,
        ...antiSpamFields
      });
      setStatus({
        type: result.ok ? "success" : "error",
        message:
          result.ok && result.id
            ? `Your inquiry has been received. Reference number: TPAP-INQ-${String(result.id).padStart(5, "0")}.`
            : result.message
      });

      if (result.ok) {
        setValues(initialValues);
        setFieldErrors({});
      } else if (result.errors) {
        setFieldErrors(
          Object.fromEntries(
            Object.entries(result.errors).map(([field, errors]) => [
              field,
              errors[0] || "Please check this field."
            ])
          )
        );
      }
    } catch {
      setStatus({
        type: "error",
        message: "Your inquiry could not be submitted right now. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function updateField(name: keyof typeof initialValues, value: string) {
    setValues((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  }

  const inputBase = "w-full border bg-white px-4 py-3 text-sm text-charcoal-900 placeholder:text-charcoal-300 outline-none transition-colors duration-150 focus:border-forest-600 focus:ring-1 focus:ring-forest-600/20";
  const inputNormal = "border-charcoal-200";
  const inputError = "border-red-300 bg-red-50";

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="border border-charcoal-100 bg-white p-8 shadow-[0_8px_40px_rgba(0,38,66,0.08)]"
    >
      <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} />
      <input name="formStartedAt" type="hidden" value={formStartedAt.current} />

      <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-forest-600">
        Send a Message
      </p>

      <FormStatus status={status} />

      <div className="grid gap-5">
        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Name</span>
          <input
            autoComplete="name"
            aria-invalid={Boolean(fieldErrors.name)}
            className={`${inputBase} ${fieldErrors.name ? inputError : inputNormal}`}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Your full name"
            required
            value={values.name}
          />
          {fieldErrors.name && <span className="text-xs font-medium text-red-600">{fieldErrors.name}</span>}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Email</span>
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
          {fieldErrors.email && <span className="text-xs font-medium text-red-600">{fieldErrors.email}</span>}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Phone</span>
          <input
            autoComplete="tel"
            aria-invalid={Boolean(fieldErrors.phone)}
            className={`${inputBase} ${fieldErrors.phone ? inputError : inputNormal}`}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="03001234567"
            required
            value={values.phone}
          />
          {fieldErrors.phone && <span className="text-xs font-medium text-red-600">{fieldErrors.phone}</span>}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-charcoal-500">Message</span>
          <textarea
            aria-invalid={Boolean(fieldErrors.message)}
            className={`${inputBase} min-h-[9rem] resize-y ${fieldErrors.message ? inputError : inputNormal}`}
            onChange={(e) => updateField("message", e.target.value)}
            placeholder="Describe your inquiry…"
            required
            value={values.message}
          />
          {fieldErrors.message && <span className="text-xs font-medium text-red-600">{fieldErrors.message}</span>}
        </label>

        <button
          className="mt-1 w-full bg-forest-800 px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-colors duration-150 hover:bg-forest-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send Inquiry"}
        </button>
      </div>
    </form>
  );
}
