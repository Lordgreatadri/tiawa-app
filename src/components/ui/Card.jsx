import { cn } from '../../lib/utils';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={cn('rounded-2xl p-6', className)}
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      {...props}
    >
      {children}
    </div>
  );
}