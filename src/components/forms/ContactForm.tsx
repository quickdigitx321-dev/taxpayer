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

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5 bg-white p-6 shadow-soft">
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
      />
      <input name="formStartedAt" type="hidden" value={formStartedAt.current} />
      <FormStatus status={status} />
      <label className="grid gap-2 text-sm font-semibold">
        Name
        <input
          autoComplete="name"
          aria-invalid={Boolean(fieldErrors.name)}
          className={`border px-4 py-3 outline-none focus:border-forest-700 ${
            fieldErrors.name ? "border-red-300 bg-red-50" : "border-charcoal-100"
          }`}
          onChange={(event) => updateField("name", event.target.value)}
          required
          value={values.name}
        />
        {fieldErrors.name ? (
          <span className="text-xs font-semibold text-red-700">{fieldErrors.name}</span>
        ) : null}
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input
          autoComplete="email"
          aria-invalid={Boolean(fieldErrors.email)}
          className={`border px-4 py-3 outline-none focus:border-forest-700 ${
            fieldErrors.email ? "border-red-300 bg-red-50" : "border-charcoal-100"
          }`}
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="name@example.com"
          required
          type="email"
          value={values.email}
        />
        {fieldErrors.email ? (
          <span className="text-xs font-semibold text-red-700">{fieldErrors.email}</span>
        ) : null}
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Phone
        <input
          autoComplete="tel"
          aria-invalid={Boolean(fieldErrors.phone)}
          className={`border px-4 py-3 outline-none focus:border-forest-700 ${
            fieldErrors.phone ? "border-red-300 bg-red-50" : "border-charcoal-100"
          }`}
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="03001234567"
          required
          value={values.phone}
        />
        {fieldErrors.phone ? (
          <span className="text-xs font-semibold text-red-700">{fieldErrors.phone}</span>
        ) : null}
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Message
        <textarea
          aria-invalid={Boolean(fieldErrors.message)}
          className={`min-h-36 border px-4 py-3 outline-none focus:border-forest-700 ${
            fieldErrors.message ? "border-red-300 bg-red-50" : "border-charcoal-100"
          }`}
          onChange={(event) => updateField("message", event.target.value)}
          required
          value={values.message}
        />
        {fieldErrors.message ? (
          <span className="text-xs font-semibold text-red-700">{fieldErrors.message}</span>
        ) : null}
      </label>
      <button
        className="rounded-full bg-forest-800 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Inquiry"}
      </button>
    </form>
  );
}
