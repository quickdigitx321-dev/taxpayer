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

export function ContactForm() {
  const formStartedAt = useRef(Date.now());
  const [values, setValues] = useState(initialValues);
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
    setIsSubmitting(true);
    setStatus(null);

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
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white p-6 shadow-soft">
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
          className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
          onChange={(event) => updateField("name", event.target.value)}
          required
          value={values.name}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Email
        <input
          autoComplete="email"
          className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
          onChange={(event) => updateField("email", event.target.value)}
          placeholder="name@example.com"
          required
          type="email"
          value={values.email}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Phone
        <input
          autoComplete="tel"
          className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
          onChange={(event) => updateField("phone", event.target.value)}
          placeholder="03001234567"
          required
          value={values.phone}
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Message
        <textarea
          className="min-h-36 border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
          onChange={(event) => updateField("message", event.target.value)}
          required
          value={values.message}
        />
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
