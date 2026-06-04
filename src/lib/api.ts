export const API_BASE_URL = "/api";

const DEFAULT_TIMEOUT_MS = 12000;

export async function apiFetch(
  path: string,
  options: RequestInit & { timeoutMs?: number } = {}
) {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    options.timeoutMs || DEFAULT_TIMEOUT_MS
  );

  try {
    return await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      signal: controller.signal
    });
  } finally {
    window.clearTimeout(timeout);
  }
}

export type ApiResult = {
  ok: boolean;
  message: string;
  id?: number;
  errors?: Record<string, string[]>;
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
  const response = await apiFetch(endpoint, {
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
        "The form could not be submitted. Please check the fields and try again.",
      errors: data.errors
    };
  }

  return {
    ok: true,
    message: data.message || "Submitted successfully.",
    id: data.id
  };
}
