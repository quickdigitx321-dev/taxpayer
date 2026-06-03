type FormStatusProps = {
  status: {
    type: "success" | "error";
    message: string;
  } | null;
};

export function FormStatus({ status }: FormStatusProps) {
  if (!status) {
    return null;
  }

  return (
    <div
      className={`border px-4 py-3 text-sm ${
        status.type === "success"
          ? "border-forest-200 bg-forest-50 text-forest-800"
          : "border-red-200 bg-red-50 text-red-700"
      }`}
    >
      {status.message}
    </div>
  );
}
