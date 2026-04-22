import { cn } from '../../lib/utils';
import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, prefix, className = '', ...props }, ref) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-gray-300">{label}</label>
      )}
      <div className="relative">
        {prefix && (
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
            {prefix}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full py-3 rounded-xl text-white placeholder-gray-500 text-sm transition-colors focus:outline-none',
            prefix ? 'pl-12 pr-4' : 'px-4',
            error ? 'border-red-500/60' : '',
            className,
          )}
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)'}`,
            fontFamily: "'Inter', sans-serif",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'rgba(124,58,237,0.7)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error
              ? 'rgba(239,68,68,0.5)'
              : 'rgba(255,255,255,0.1)';
          }}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
});

export default Input;
