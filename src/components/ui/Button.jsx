import { cn } from '../../lib/utils';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-60 disabled:cursor-not-allowed';

  const variants = {
    primary: 'text-white',
    outline: 'border text-gray-300 hover:text-white',
    ghost: 'text-gray-400 hover:text-white hover:bg-white/5',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const primaryStyle =
    variant === 'primary'
      ? { background: 'linear-gradient(135deg,#7c3aed,#4f46e5)' }
      : variant === 'outline'
      ? { border: '1px solid rgba(255,255,255,0.12)' }
      : {};

  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      style={primaryStyle}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
