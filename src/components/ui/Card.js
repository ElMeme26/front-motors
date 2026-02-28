export default function Card({ title, children, className = '' }) {
  return (
    <section className={`bg-white border border-slate-200 rounded-2xl shadow-md ${className}`}>
      {title ? (
        <div className="px-5 py-4 border-b bg-slate-50">
          <h2 className="font-semibold text-slate-900">{title}</h2>
        </div>
      ) : null}

      <div className="px-5 py-4">
        {children}
      </div>
    </section>
  );
}

