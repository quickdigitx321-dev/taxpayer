export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export type ApiResult = {
  ok: boolean;
  message: string;
  id?: number;
};

function formatValidationErrors(errors: unknown) {
  if (!errors || typeof errors !== "object") {
    return "";
  }

  const messages = Object.entries(errors as Record<string, string[]>)
    .flatMap(([field, fieldErrors]) =>
      Array.isArray(fieldErrors)
        ? fieldErrors.map((error) => `${field}: ${error}`)
        : []
    )
    .join(" | ");

  return messages ? ` ${messages}` : "";
}

export async function postPublicForm(
  endpoint: string,
  payload: Record<string, string>
): Promise<ApiResult> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const details = formatValidationErrors(data.errors);

    return {
      ok: false,
      message:
        `${data.message || "The form could not be submitted."}${details}` ||
        "The form could not be submitted. Please check the fields and try again."
    };
  }

  return {
    ok: true,
    message: data.message || "Submitted successfully.",
    id: data.id
  };
}
