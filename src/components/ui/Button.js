export default function Button({ children, className = '', variant = 'primary', ...props }) {
  const base =
    'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed';
  const styles = {
    primary: 'bg-slate-900 text-white hover:bg-slate-800',
    secondary: 'bg-white border border-slate-200 hover:bg-slate-50',
    danger: 'bg-red-600 text-white hover:bg-red-500',
  };

  return (
    <button className={`${base} ${styles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

