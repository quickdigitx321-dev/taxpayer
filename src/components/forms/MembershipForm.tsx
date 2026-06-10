"use client";

import { FormEvent, useRef, useState } from "react";
import { postPublicForm } from "@/lib/api";
import { FormStatus } from "./FormStatus";

const fields = [
  { name: "firstName", label: "First Name", autoComplete: "given-name" },
  { name: "lastName", label: "Last Name", autoComplete: "family-name" },
  { name: "cnic", label: "CNIC Number", placeholder: "12345-1234567-1" },
  { name: "ntn", label: "NTN Number", placeholder: "1234567" },
  { name: "organizationName", label: "Organization Name" },
  { name: "phone", label: "Phone Number", autoComplete: "tel", placeholder: "03001234567" },
  { name: "email", label: "Email Address", autoComplete: "email", placeholder: "name@example.com" },
  { name: "officeAddress", label: "Office Address", placeholder: "Office address, city", wide: true }
];

const initialValues = Object.fromEntries(fields.map((field) => [field.name, ""]));
const phoneRegex = /^[+0-9\s()-]{7,30}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ntnRegex = /^[A-Za-z0-9-]{5,30}$/;

function formatCnic(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 13);
  const first = digits.slice(0, 5);
  const second = digits.slice(5, 12);
  const third = digits.slice(12, 13);

  if (digits.length > 12) {
    return `${first}-${second}-${third}`;
  }

  if (digits.length > 5) {
    return `${first}-${second}`;
  }

  return first;
}

export function MembershipForm() {
  const formStartedAt = useRef(Date.now());
  const [values, setValues] = useState<Record<string, string>>(initialValues);
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

    if (values.firstName.trim().length < 2) {
      nextErrors.firstName = "First name must be at least 2 characters.";
    }
    if (values.lastName.trim().length < 2) {
      nextErrors.lastName = "Last name must be at least 2 characters.";
    }
    if (values.cnic.replace(/\D/g, "").length !== 13) {
      nextErrors.cnic = "CNIC must be 13 digits in this format: 12345-1234567-1.";
    }
    if (!ntnRegex.test(values.ntn.trim())) {
      nextErrors.ntn = "NTN must be 5 to 30 letters, numbers, or dashes.";
    }
    if (values.organizationName.trim().length < 2) {
      nextErrors.organizationName = "Organization name must be at least 2 characters.";
    }
    if (!phoneRegex.test(values.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!emailRegex.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (values.officeAddress.trim().length < 10) {
      nextErrors.officeAddress = "Office address must be at least 10 characters.";
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
      const result = await postPublicForm("/membership-applications", {
        ...values,
        ...antiSpamFields
      });
      setStatus({
        type: result.ok ? "success" : "error",
        message:
          result.ok && result.id
            ? `Application received successfully. Your reference number is TPAP-APP-${String(result.id).padStart(5, "0")}. Please keep this number for follow-up.`
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
        message: "Your application could not be submitted right now. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="grid gap-6 border border-charcoal-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,38,66,0.08)] md:grid-cols-2 lg:p-10"
    >
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="website"
        tabIndex={-1}
      />
      <input name="formStartedAt" type="hidden" value={formStartedAt.current} />
      <div className="md:col-span-2">
        <FormStatus status={status} />
      </div>
      {fields.map((field) => (
        <label
          key={field.name}
          className={`grid gap-2 ${field.wide ? "md:col-span-2" : ""}`}
        >
          <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-charcoal-600">
            {field.label}
          </span>
          <input
            autoComplete={field.autoComplete}
            aria-invalid={Boolean(fieldErrors[field.name])}
            className={`border px-4 py-3 text-sm text-charcoal-900 outline-none transition-all duration-150 placeholder:text-charcoal-300 focus:border-forest-600 focus:ring-2 focus:ring-forest-100 ${
              fieldErrors[field.name]
                ? "border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-50"
                : "border-charcoal-200 bg-white hover:border-charcoal-400"
            }`}
            name={field.name}
            onChange={(event) => {
              const value =
                field.name === "cnic"
                  ? formatCnic(event.target.value)
                  : event.target.value;
              setValues((current) => ({ ...current, [field.name]: value }));
              setFieldErrors((current) => ({ ...current, [field.name]: "" }));
            }}
            placeholder={field.placeholder}
            required
            inputMode={field.name === "cnic" ? "numeric" : undefined}
            maxLength={field.name === "cnic" ? 15 : undefined}
            pattern={field.name === "cnic" ? "\\d{5}-\\d{7}-\\d{1}" : undefined}
            title={field.name === "cnic" ? "Enter CNIC in this format: 12345-1234567-1" : undefined}
            value={values[field.name]}
          />
          {fieldErrors[field.name] ? (
            <span className="text-xs font-medium text-red-700">
              {fieldErrors[field.name]}
            </span>
          ) : null}
        </label>
      ))}
      <div className="md:col-span-2">
        <button
          className="w-full border border-forest-900 bg-forest-900 px-6 py-4 text-sm font-bold tracking-widest text-white transition-all duration-150 hover:bg-forest-800 hover:shadow-[0_4px_16px_rgba(0,38,66,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting…" : "Submit Application →"}
        </button>
        <p className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-400">
          <span className="h-px w-8 bg-charcoal-200" />
          Your information is kept confidential and used only for membership processing.
          <span className="h-px w-8 bg-charcoal-200" />
        </p>
      </div>
    </form>
  );
}
