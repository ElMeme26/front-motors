export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base =
    'inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-teal-600 text-white hover:bg-teal-700',
    secondary: 'bg-white border border-slate-200 text-slate-800 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  const variantClass = styles[variant] || styles.primary;

  return (
    <button className={`${base} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}

