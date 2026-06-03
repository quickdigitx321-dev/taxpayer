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

export function MembershipForm() {
  const formStartedAt = useRef(Date.now());
  const [values, setValues] = useState<Record<string, string>>(initialValues);
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
    <form onSubmit={handleSubmit} className="grid gap-5 bg-white p-6 shadow-soft md:grid-cols-2">
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
          className={`grid gap-2 text-sm font-semibold ${
            field.wide ? "md:col-span-2" : ""
          }`}
        >
          {field.label}
          <input
            autoComplete={field.autoComplete}
            className="border border-charcoal-100 px-4 py-3 outline-none focus:border-forest-700"
            name={field.name}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                [field.name]: event.target.value
              }))
            }
            placeholder={field.placeholder}
            required
            value={values[field.name]}
          />
        </label>
      ))}
      <button
        className="rounded-full bg-forest-800 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
