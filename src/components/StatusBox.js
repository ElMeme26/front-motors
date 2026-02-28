export default function StatusBox({ loading, error, success }) {
  if (loading) {
    return (
      <p className="p-2 rounded-md bg-amber-50 text-amber-800 text-sm">
        Procesando...
      </p>
    );
  }
  if (error) {
    return (
      <p className="p-2 rounded-md bg-red-50 text-red-700 text-sm">
        Error: {error}
      </p>
    );
  }
  if (success) {
    return (
      <p className="p-2 rounded-md bg-teal-50 text-teal-800 text-sm">
        {success}
      </p>
    );
  }
  return null;
}

